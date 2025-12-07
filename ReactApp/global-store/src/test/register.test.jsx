import {test,expect} from "vitest"
import Register from "../auth/register/Register"
import { render ,screen, fireEvent } from "@testing-library/react"

test("that the input collects firstName",()=>{
    render(<Register/>)
    const input = screen.getByLabelText(/firstName/i);
    fireEvent.change(input,{target :{value:"NENE"}});
    expect(input.value).toBe("NENE");
});