import React, { useState } from "react";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Meteor } from "meteor/meteor";

export const TaskForm = () => {
    const [taskText, setTaskText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskText) return;

        await Meteor.callAsync("tasks.insert", (taskText));
        setTaskText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField type="text" placeholder="Type to add new tasks"
            value={taskText} onChange={(e) => setTaskText(e.target.value)} />

            <Button type="submit" variant="contained">Add Task</Button>
        </form>
    );
};