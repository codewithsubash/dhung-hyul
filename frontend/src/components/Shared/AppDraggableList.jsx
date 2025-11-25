import React from "react";
import { Box, Divider } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"; // ✅ Updated import
import { DragIndicator } from "@mui/icons-material";

import HoverablePaper from "./HoverablePaper/HoverablePaper";
import EmptyResult from "../../Lottie/EmptyResult";
import LoadingWrapper from "./Loading/LoadingWrapper";

const AppDraggableList = ({
  isBusy = false,
  listItems = [],
  loadingText = "Saving Order",
  draggableItem: DraggableItem,
  isDragDisabled = false,
  onDragEnd = () => {},
}) => {
  return listItems?.length ? (
    <LoadingWrapper loading={isBusy} loadingText={loadingText}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list-container">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`rounded border-2 transition-colors duration-75 ease-in ${
                snapshot.isDraggingOver
                  ? "border-dashed border-green-500"
                  : "border-transparent"
              }`}
            >
              {listItems?.map((listItem, index) => (
                <Draggable
                  key={listItem?._id}
                  draggableId={listItem?._id}
                  index={index}
                  isDragDisabled={isBusy || isDragDisabled}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-colors duration-75 ease-in ${
                        snapshot.isDragging
                          ? "border-2 border-dashed border-blue-500"
                          : ""
                      }`}
                    >
                      <HoverablePaper className="group flex select-none items-center justify-between space-x-4 px-4">
                        <div
                          {...provided.dragHandleProps}
                          className="flex-shrink-0 rounded border border-transparent bg-blue-50 text-gray-400 group-hover:border-blue-200 group-hover:text-blue-500 dark:bg-slate-800 dark:group-hover:border-slate-700"
                        >
                          <DragIndicator />
                        </div>

                        <div className="flex-grow">
                          <DraggableItem data={listItem} />
                        </div>
                      </HoverablePaper>

                      {index !== listItems?.length - 1 && (
                        <Box paddingX={3}>
                          <Divider />
                        </Box>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </LoadingWrapper>
  ) : (
    <EmptyResult />
  );
};

export default AppDraggableList;
