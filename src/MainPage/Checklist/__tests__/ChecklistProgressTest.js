import { render, screen } from '@testing-library/react'
import ChecklistProgress from '../ChecklistProgress';

const mockChecklist = [
    {
        id: 1,
        checked: false,
        month: "December",
        name: "Task 1",
        user_email: "test@tes.com",
        subtasks: []
    },
    {
        id: 2,
        checked: false,
        month: "December",
        name: "Task 2",
        user_email: "test@tes.com",
        subtasks: []
    },
    {
        id: 3,
        checked: true,
        month: "December",
        name: "Task 3",
        user_email: "test@tes.com",
        subtasks: []
    }

]
test("Progress bar should display correct value", () => {
    render(<ChecklistProgress checklist={mockChecklist}/>);

    const correctValue = screen.getByText(/You've completed 1 out of 3 tasks/i);

    expect(correctValue).toBeInTheDocument();
})
