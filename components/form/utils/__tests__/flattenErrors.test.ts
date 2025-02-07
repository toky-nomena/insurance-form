import { describe, it, expect } from "vitest";
import { FieldErrors, FieldValues } from "react-hook-form";

import { flattenErrors, FormError, getErrorById } from "../flattenErrors";

describe("flattenErrors", () => {
  it("should handle simple field errors", () => {
    const errors: FieldErrors<FieldValues> = {
      email: {
        type: "required",
        message: "Email is required",
      },
      password: {
        type: "minLength",
        message: "Password must be at least 6 characters",
      },
    };

    const expected: FormError[] = [
      { id: "email", message: "Email is required" },
      { id: "password", message: "Password must be at least 6 characters" },
    ];

    expect(flattenErrors(errors)).toEqual(expected);
  });

  it("should handle nested field errors", () => {
    const errors: FieldErrors<FieldValues> = {
      user: {
        firstName: {
          type: "required",
          message: "First name is required",
        },
        lastName: {
          type: "required",
          message: "Last name is required",
        },
      },
    };

    const expected: FormError[] = [
      { id: "user.firstName", message: "First name is required" },
      { id: "user.lastName", message: "Last name is required" },
    ];

    expect(flattenErrors(errors)).toEqual(expected);
  });

  it("should handle deeply nested field errors", () => {
    const errors: FieldErrors<FieldValues> = {
      address: {
        shipping: {
          street: {
            type: "required",
            message: "Street is required",
          },
          city: {
            type: "required",
            message: "City is required",
          },
        },
      },
    };

    const expected: FormError[] = [
      { id: "address.shipping.street", message: "Street is required" },
      { id: "address.shipping.city", message: "City is required" },
    ];

    expect(flattenErrors(errors)).toEqual(expected);
  });

  it("should handle array field errors", () => {
    const errors: FieldErrors<FieldValues> = {
      phones: {
        0: {
          number: {
            type: "pattern",
            message: "Invalid phone number",
          },
        },
        1: {
          number: {
            type: "pattern",
            message: "Invalid phone number format",
          },
        },
      },
    };

    const expected: FormError[] = [
      { id: "phones.0.number", message: "Invalid phone number" },
      { id: "phones.1.number", message: "Invalid phone number format" },
    ];

    expect(flattenErrors(errors)).toEqual(expected);
  });

  it("should handle mixed nested and simple errors", () => {
    const errors: FieldErrors<FieldValues> = {
      email: {
        type: "required",
        message: "Email is required",
      },
      address: {
        street: {
          type: "required",
          message: "Street is required",
        },
      },
      phones: {
        0: {
          number: {
            type: "required",
            message: "Invalid phone number",
          },
        },
      },
    };

    const expected: FormError[] = [
      { id: "email", message: "Email is required" },
      { id: "address.street", message: "Street is required" },
      { id: "phones.0.number", message: "Invalid phone number" },
    ];

    expect(flattenErrors(errors)).toEqual(expected);
  });

  it("should handle empty errors object", () => {
    const errors: FieldErrors<FieldValues> = {};
    const expected: FormError[] = [];

    expect(flattenErrors(errors)).toEqual(expected);
  });

  it("should handle undefined values", () => {
    const errors: FieldErrors<FieldValues> = {
      email: undefined,
    };

    const expected: FormError[] = [{ id: "email", message: "" }];

    expect(flattenErrors(errors)).toEqual(expected);
  });
});

describe("getErrorById", () => {
  it("should return the error message for a valid id", () => {
    const errors: FieldErrors<FieldValues> = {
      field1: { message: "Error message for field1", type: "required" },
      field2: { message: "Error message for field2", type: "required" },
    };
    expect(getErrorById(errors, "field1")).toBe("Error message for field1");
  });

  it("should return undefined for an invalid id", () => {
    const errors: FieldErrors<FieldValues> = {
      field1: { message: "Error message for field1", type: "required" },
    };
    expect(getErrorById(errors, "field2")).toBeUndefined();
  });

  it("should return undefined if there are no errors", () => {
    const errors: FieldErrors<FieldValues> = {};
    expect(getErrorById(errors, "field1")).toBeUndefined();
  });

  it("should handle nested errors correctly", () => {
    const errors: FieldErrors<FieldValues> = {
      field1: {
        field2: { message: "Nested error message", type: "required" },
      },
    };
    expect(getErrorById(errors, "field1.field2")).toBe("Nested error message");
  });
});
