import React from "react";
import {
  useLazyDetailListQuery,
  useAddListMutation,
  useEditListMutation,
} from "../../../../store/services/listApi";
import { useSearchParams } from "react-router-dom";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import { Button, IconButton, Chip, Switch, Paper, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { BaseDrawer } from "../../../../components/Shared/Base/BaseDrawer/BaseDrawer";
import ListForm from "./ListForm";
import AppDraggableList from "../../../../components/Shared/AppDraggableList";

const ListDetailScreen = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const breadcrumbs = [
    { title: "Customize List", path: "/app/crm/customize-list/list" },
    { title: `${type}` },
  ];

  const [
    fetchListDetail,
    {
      isLoading: loadingList,
      isFetching: fetchingList,
      data: listDetailRaw,
      error,
      refetch,
    },
  ] = useLazyDetailListQuery();

  const [addList, { isLoading: adding }] = useAddListMutation();
  const [editList, { isLoading: editing }] = useEditListMutation();

  const [listItems, setListItems] = React.useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);
  const [isSavingOrder, setIsSavingOrder] = React.useState(false);

  // fetch on mount / type change
  React.useEffect(() => {
    if (type) fetchListDetail({ type });
  }, [fetchListDetail, type]);

  // normalize incoming data (if backend returns array under data)
  React.useEffect(() => {
    if (Array.isArray(listDetailRaw)) {
      const sorted = [...listDetailRaw].sort(
        (a, b) => (a.serialNumber || 0) - (b.serialNumber || 0)
      );
      setListItems(sorted);
    } else if (listDetailRaw?.data && Array.isArray(listDetailRaw.data)) {
      const sorted = [...listDetailRaw.data].sort(
        (a, b) => (a.serialNumber || 0) - (b.serialNumber || 0)
      );
      setListItems(sorted);
    }
  }, [listDetailRaw]);

  // drag end handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    if (from === to) return;

    const items = Array.from(listItems);
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);

    // update state immediately for UX
    setListItems(items);
  };

  // Save order -> update serialNumber on backend (ONLY for Active items)
  const handleSaveOrder = async () => {
    setIsSavingOrder(true);
    try {
      let serialCounter = 1;
      const updates = listItems.map((item) => {
        // Only assign serial numbers to Active items
        const newSerialNumber =
          item.status === "Active" ? serialCounter++ : null;

        return editList({
          id: item._id,
          serialNumber: newSerialNumber,
        }).unwrap();
      });

      await Promise.all(updates);
      // refetch after save
      await refetch?.();
    } catch (err) {
      console.error("Failed to save order", err);
    } finally {
      setIsSavingOrder(false);
    }
  };

  // Add new or edit existing item
  const handleSubmitForm = async (values) => {
    try {
      if (editingItem) {
        // FIXED: Pass the ID correctly for edit
        await editList({
          id: editingItem._id,
          name: values.name,
          status: values.status,
          // Don't update serialNumber here - it's handled by drag-drop
        }).unwrap();
      } else {
        // For new items, calculate next serial number from ACTIVE items only
        const activeItems = listItems.filter((it) => it.status === "Active");
        const maxSerial = activeItems.reduce(
          (max, it) => Math.max(max, it.serialNumber || 0),
          0
        );

        await addList({
          type,
          name: values.name,
          status: values.status,
          serialNumber: values.status === "Active" ? maxSerial + 1 : null,
        }).unwrap();
      }

      // close drawer, clear edit state and refetch
      setOpenDrawer(false);
      setEditingItem(null);
      await refetch?.();
    } catch (err) {
      console.error("submit error", err);
    }
  };

  // Draggable item renderer
  const DraggableItem = ({ data }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          width: "100%",
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        {/* name */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 500 }}>{data.name}</div>
          <div style={{ fontSize: 12, color: "#777" }}>
            Serial: {data.serialNumber ?? "N/A"}
          </div>
        </div>

        {/* status chip */}
        <div style={{ marginRight: 12 }}>
          <Chip
            label={data.status || "Active"}
            size="small"
            variant="outlined"
            sx={{
              backgroundColor:
                data.status === "Active"
                  ? "rgba(16,185,129,0.08)"
                  : "rgba(239,68,68,0.08)",
              borderColor: "transparent",
              color: data.status === "Active" ? "#10b981" : "#ef4444",
            }}
          />
        </div>

        {/* edit button */}
        <IconButton
          size="small"
          onClick={() => {
            setEditingItem(data);
            setOpenDrawer(true);
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>

        {/* toggle switch */}
        <Switch
          checked={data.status === "Active"}
          onChange={async (e) => {
            const newStatus = e.target.checked ? "Active" : "InActive";
            try {
              await editList({
                id: data._id,
                status: newStatus,
              }).unwrap();
              await refetch?.();
            } catch (err) {
              console.error("status update failed", err);
            }
          }}
          size="small"
        />
      </div>
    );
  };

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      headerActions={
        <PageActions
          onNew={() => {
            setEditingItem(null);
            setOpenDrawer(true);
          }}
          onSaveOrder={handleSaveOrder}
          isSavingOrder={isSavingOrder}
        />
      }
    >
      <BreadcrumbLayout.Paper>
        <Paper elevation={0} sx={{ p: 1 }}>
          <AppDraggableList
            isBusy={isSavingOrder || adding || editing}
            listItems={listItems}
            draggableItem={DraggableItem}
            onDragEnd={handleDragEnd}
            loadingText="Saving Order"
          />
        </Paper>

        {/* Drawer with form for add/edit */}
        <BaseDrawer
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            setEditingItem(null);
          }}
        >
          <ListForm
            initialData={editingItem}
            onSubmit={handleSubmitForm}
            onCancel={() => {
              setOpenDrawer(false);
              setEditingItem(null);
            }}
          />
        </BaseDrawer>
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default ListDetailScreen;

const PageActions = ({
  onNew = () => {},
  onSaveOrder = () => {},
  isSavingOrder = false,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button variant="outlined" onClick={onSaveOrder} disabled={isSavingOrder}>
        {isSavingOrder ? "Saving..." : "Save Order"}
      </Button>
      <Button startIcon={<AddIcon />} variant="contained" onClick={onNew}>
        New Option
      </Button>
    </div>
  );
};
