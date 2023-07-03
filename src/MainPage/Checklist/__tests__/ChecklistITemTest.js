import { render, screen } from '@testing-library/react'
import ChecklistItem from '../ChecklistItem';

const mockTask = {
    id: 1,
    checked: false,
    month: "December",
    name: "Task 1",
    user_email: "test@tes.com",
    subtasks: [
        {
            checked: true,
            checklist_id: 1,
            id: 10,
            name: "just for testing"
        }
    ]
}
test("Task name is in the page", () => {
    render(<ChecklistItem task={mockTask}/>);

    const taskName = screen.getByText(/Task 1/i);

    expect(taskName).toBeInTheDocument();
})

test("Subtask name is in the page", () => {
    render(<ChecklistItem task={mockTask}/>);

    const subtaskName = screen.getByText(/just for testing/i);

    expect(subtaskName).toBeInTheDocument();
})