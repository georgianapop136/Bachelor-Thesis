import { render, screen } from '@testing-library/react'
import Category from '../Category';

const mockCategory = {
    id: 1,
    icon_number: 1,
    name: "Category 1",
    user_email: "test@tes.com",
    expenses: [
        {
            value: 1000,
            id: 10,
            name: "expense just for testing",
            category_id: 1
        }
    ]
}
test("Category name is in the page", () => {
    render(<Category category={mockCategory}/>);

    const taskName = screen.getByText(/Category 1/i);

    expect(taskName).toBeInTheDocument();
})

test("Expense name is in the page", () => {
    render(<Category category={mockCategory}/>);

    const subtaskName = screen.getByText(/expense just for testing/i);

    expect(subtaskName).toBeInTheDocument();
})