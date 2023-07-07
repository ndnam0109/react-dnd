import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

const playerList = [
  { id: uuidv4(), content: "1 task" },
  { id: uuidv4(), content: "2 task" },
  { id: uuidv4(), content: "3 task" },
  { id: uuidv4(), content: "4 task" },
  { id: uuidv4(), content: "5 task" },
];

const rowsFromBackend = {
  GK: {
    name: "GK",
    items: [{ id: uuidv4(), content: "" },{ id: uuidv4(), content: "" },{ id: uuidv4(), content: "" },{ id: uuidv4(), content: "" },{ id: uuidv4(), content: "" },]
  },
  List: {
    name: "List",
    items: playerList
  }
};

const onDragEnd = (result, rows, setRows) => {
  console.log(result)
  console.log(rows)
  console.log(setRows)
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = rows[source.droppableId];
    const destColumn = rows[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1,{ id: uuidv4(), content: "" });
    destItems.splice(destination.index, 1, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = rows[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setRows({
      ...rows,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [rows, setRows] = useState(rowsFromBackend);

  const check = () => {
    if(rows.GK.items.length + rows.DF.items.length + rows.MF.items.length + rows.FW2.items.length + rows.FW.items.length != 11) {
      console.log('11명이 아니다')
    }
    // if(rows.GK.items.length == 1) {
    //   console.log('안녕')
    // }
  }
  console.log(rows.GK.items.length)
  console.log(rows)

  const resetItem = () => {
    console.log('lam moi')
    setRows(rowsFromBackend)
  }
  return (
    <div>
      <div>

      </div>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', height: '60rem', }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, rows, setRows)}
        >
          {Object.entries(rows).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
                key={columnId}
              >
                <div>
                  <Droppable droppableId={columnId} key={columnId}
                    direction = 'horizontal'
                    justifyContent = 'center'
                    alignContent = 'center'
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "white",
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'row',
                            overflowX: "auto",
                            width: "100vw",
                            justifyContent: 'start',
                            minHeight: '8rem',
                            alignContent : 'center'
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 4,
                                        height: '6rem',
                                        minHeight: "6rem",
                                        width: '6rem',
                                        minWidth: "6rem",
                                        borderRadius:'100%',
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        border: '1px solid black',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
        <button onClick={resetItem}>Lam moi</button>
      </div>
    </div>
  );
}

export default App;
