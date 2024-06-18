const { render, screen, fireEvent } = require("@testing-library/react");
const { AddCategory } = require("../../src/components");

describe("Prueba en <AddCategory/>", () => {
  test("debe hacer match con el snapshot", () => {
    const { container } = render(<AddCategory onNewCategory={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  test("debe cambiar el valor de la caja de texto", () => {
    render(<AddCategory onNewCategory={() => {}} />);
    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: "Saitama" } });
    expect(input.value).toBe("Saitama");
  });

  test("debe de llamar onNewCategory si el input tiene un valor", () => {
    const inpuValue = "Saitama";

    const onNewCategory = jest.fn();

    render(<AddCategory onNewCategory={onNewCategory} />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inpuValue } });
    fireEvent.submit(form);

    // screen.debug();

    expect(input.value).toBe("");

    expect(onNewCategory).toHaveBeenCalled();
    expect(onNewCategory).toHaveBeenCalledTimes(1);

    expect(onNewCategory).toHaveBeenCalledWith(inpuValue);
  });

  test('no debe llamar el onNewCategory si el input está vacio', () => {
    const onNewCategory = jest.fn();

    render(<AddCategory onNewCategory={onNewCategory} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(onNewCategory).toHaveBeenCalledTimes(0);
    expect(onNewCategory).not.toHaveBeenCalled();
    
   })
});
