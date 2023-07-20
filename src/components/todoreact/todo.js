import React, { useState, useEffect } from 'react'
import "./styles.css"

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")
    if (lists) {
        return JSON.parse(lists);
    }
    else {
        return [];
    }
}


function Todo() {

    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData);
    const [isEditItem, setisEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const addItem = () => {
        if (!inputdata) {
            alert("Add item;")
        }
        else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputdata };
                    }
                    return curElem;
                })
            );

            setInputData("");
            setisEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };
    const removeAll = () => {
        setItems([]);
    };

    const editItem = (index) => {
        const item_todo_edited = items.find((currElem) => {
            return currElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setisEditItem(index);
        setToggleButton(true);
    }





    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items]);


    return (

        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="images/todo.svg" alt="imageofwork" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="✍ Add Item"
                            className="form-control"
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>
                    <div className="showItems">
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i
                                            className="far fa-edit add-btn"
                                            onClick={() => editItem(curElem.id)}></i>
                                        <i
                                            className="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>




                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove
                All" onClick={removeAll}><span>CHECKLIST</span></button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Todo
