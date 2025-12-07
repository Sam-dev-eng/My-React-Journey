import {renderHook} from "@testing-library/react"
import { describe,it, expect } from "vitest";
import useRegister from "../costomeHooks/useRegister";

describe("useRegister Test",()=>{
    it(("sample test"),()=>{
        const userDetails = {
            firstName:"Samuel", 
            lastName:"Chukwunonso",
            email:"samuel@example.com",
            confirmPassword:"password123"
        }
        const {result} = renderHook(()=>useRegister(userDetails));
        expect(result.current.name).toBe("Samuel")
        expect(result.current.message).toBe("Registration Successful");
        expect(result.current.lastName).toBe("Chukwunonso");
    })
})