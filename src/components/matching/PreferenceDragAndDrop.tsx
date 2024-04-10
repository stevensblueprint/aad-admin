import { useCallback } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { type Preference } from "./MatchingFormSteps";

const PreferenceDragAndDrop = ({
  preferences,
  setPreferences,
}: {
  preferences: Preference[];
  setPreferences: React.Dispatch<React.SetStateAction<Preference[]>>;
}) => {
  // Reorder function as before
  const reorder = (
    list: Preference[],
    startIndex: number,
    endIndex: number,
  ): Preference[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed!);
    return result;
  };

  // Modified onDragEnd function using useCallback and updating the preferences state
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      const newPreferences = reorder(
        preferences,
        result.source.index,
        result.destination.index,
      );
      setPreferences(newPreferences);
    },
    [preferences, setPreferences],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="preferences">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {preferences.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.name.split(" ").join("-")}
                index={index}
              >
                {(provided, snapshot) => {
                  const style = {
                    borderWidth: 1,
                    borderColor: snapshot.isDragging ? "blue" : "grey",
                    ...provided.draggableProps.style,
                  };
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-4 flex items-center rounded-md bg-gray-100 p-4"
                      style={style}
                    >
                      <div className="mr-3 inline w-3 rounded-xl font-bold text-blue-600">
                        {index + 1}
                      </div>
                      <DragHandleIcon sx={{ marginRight: 2 }} />
                      <span>{item.name}</span>
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PreferenceDragAndDrop;
