import { css } from "@/vendors/styled-system/css";
import { Box, Stack } from "@/vendors/styled-system/jsx";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  ArrowRight,
  Envelope,
  Eye,
  EyeDisabled,
  Lock,
  MagnifyingGlass,
  Rectangles,
} from "../icons";
import TextField from "./text-field";

const meta: Meta<typeof TextField> = {
  title: "Components V2/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    label: "Label",
    placeholder: "Input Text",
  },
  argTypes: {
    name: {
      description: "Name attribute for the input field",
      control: { type: "text" },
    },
    label: {
      description: "Label text displayed above the input",
      control: { type: "text" },
    },
    placeholder: {
      description: "Placeholder text shown when input is empty",
      control: { type: "text" },
    },
    maxLength: {
      description: "Maximum length of the input",
      control: { type: "number" },
    },
    message: {
      description: "Helper or error message displayed below the input",
      control: { type: "text" },
    },
    error: {
      description: "Error state - changes border color and message styling",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "Disabled state - prevents interaction",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    prefix: {
      description: "Text prefix displayed before the input value",
      control: { type: "text" },
    },
    suffix: {
      description: "Text suffix displayed after the input value",
      control: { type: "text" },
    },
    leftAdornment: {
      description: "Icon component displayed on the left side",
      control: { type: "select" },
      options: ["None", "MagnifyingGlass", "Envelope", "Lock"],
      mapping: {
        None: undefined,
        MagnifyingGlass: MagnifyingGlass,
        Envelope: Envelope,
        Lock: Lock,
      },
    },
    rightAdornment: {
      description: "Icon component displayed on the right side",
      control: { type: "select" },
      options: ["None", "ArrowRight"],
      mapping: {
        None: undefined,
        ArrowRight: ArrowRight,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A textfield is a user interface element used to input and edit text. It is a rectangular box or area where users can enter characters, numbers or other data. Textfields are used in forms, chat applications, and other interactive elements requiring user input.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground: Story = {
  args: {
    label: "Label",
    placeholder: "Input Text",
    id: "text-field-playground",
  },
};

// ============================================================================
// Basic States
// ============================================================================

export const States: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Default State
        </Box>
        <TextField id="default" label="Label" placeholder="Input Text" />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          With Value
        </Box>
        <TextField id="with-value" label="Label" defaultValue="Input value" />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Error State
        </Box>
        <TextField
          id="error"
          label="Label"
          placeholder="Input Text"
          error
          message="Error message"
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Disabled State
        </Box>
        <TextField
          id="disabled"
          label="Label"
          placeholder="Input Text"
          disabled
        />
      </Box>
    </Stack>
  ),
};

// ============================================================================
// With Messages
// ============================================================================

export const Messages: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Helper Message
        </Box>
        <TextField
          id="helper"
          label="Label"
          placeholder="Input Text"
          message="Helper message"
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Error Message
        </Box>
        <TextField
          id="error-message"
          label="Label"
          placeholder="Input Text"
          error
          message="Error message"
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Long Message (Truncated)
        </Box>
        <Box maxW="400px">
          <TextField
            id="long-message"
            label="Label"
            placeholder="Input Text"
            message="This is a very long message that demonstrates how the TextField handles lengthy helper text"
          />
        </Box>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// With Max Length
// ============================================================================

export const MaxLength: Story = {
  render: () => (
    <Box>
      <Box
        fontSize="sbds-global-font-size-6"
        fontWeight="bold"
        mb="sbds-dimension-space-size-s"
      >
        Max Length (20 characters)
      </Box>
      <TextField
        id="max-length"
        label="Label"
        placeholder="Input Text"
        maxLength={20}
      />
    </Box>
  ),
};

// ============================================================================
// With Adornments (Icons)
// ============================================================================

export const Adornments: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Left Adornment Only
        </Box>
        <TextField
          id="left-adornment"
          label="Label"
          placeholder="Input Text"
          leftAdornment={MagnifyingGlass}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Right Adornment Only
        </Box>
        <TextField
          id="right-adornment"
          label="Label"
          placeholder="Input Text"
          rightAdornment={ArrowRight}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Both Adornments
        </Box>
        <TextField
          id="both-adornments"
          label="Label"
          placeholder="Input Text"
          leftAdornment={Envelope}
          rightAdornment={ArrowRight}
        />
      </Box>
    </Stack>
  ),
};

// ============================================================================
// With Prefix & Suffix
// ============================================================================

export const PrefixSuffix: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Prefix Only
        </Box>
        <TextField
          id="prefix"
          label="Price (SGD)"
          placeholder="0.00"
          prefix="S$"
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Suffix Only
        </Box>
        <TextField id="suffix" label="Weight" placeholder="0" suffix="kg" />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Both Prefix and Suffix
        </Box>
        <TextField
          id="both-prefix-suffix"
          label="Exchange Rate"
          placeholder="0.00"
          prefix="$"
          suffix="USD"
        />
      </Box>
    </Stack>
  ),
};

// ============================================================================
// Without Label
// ============================================================================

export const WithoutLabel: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Basic (No Label)
        </Box>
        <TextField id="no-label-basic" placeholder="Input Text" />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          With Message (No Label)
        </Box>
        <TextField
          id="no-label-message"
          placeholder="Input Text"
          leftAdornment={MagnifyingGlass}
          message="Helper message"
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          With Error (No Label)
        </Box>
        <TextField
          id="no-label-error"
          placeholder="Input Text"
          leftAdornment={Envelope}
          error
          message="Error message"
        />
      </Box>
    </Stack>
  ),
};

// ============================================================================
// With Action
// ============================================================================

export const WithAction: Story = {
  render: function ActionExamples() {
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);

    const togglePasswordVisibility = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowPassword((prev) => !prev);
    };

    const handleCopy = (e: React.MouseEvent) => {
      e.stopPropagation();
      const input = document.getElementById("copy-field") as HTMLInputElement;
      if (input?.value) {
        navigator.clipboard.writeText(input.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const ToggleIcon = showPassword ? EyeDisabled : Eye;

    return (
      <Stack gap="sbds-dimension-space-size-xl">
        <Box>
          <Box
            fontSize="sbds-global-font-size-6"
            fontWeight="bold"
            mb="sbds-dimension-space-size-s"
          >
            Password Field with Toggle Visibility
          </Box>
          <Box
            fontSize="sbds-global-font-size-4"
            color="sbds-font-color-secondary"
            mb="sbds-dimension-space-size-m"
          >
            Click the eye icon to toggle password visibility
          </Box>
          <TextField
            id="password-field"
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            action={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={css({
                  cursor: "pointer",
                  bg: "transparent",
                  border: "none",
                  p: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                })}
              >
                <ToggleIcon tone="primary" />
              </button>
            }
          />
        </Box>

        <Box>
          <Box
            fontSize="sbds-global-font-size-6"
            fontWeight="bold"
            mb="sbds-dimension-space-size-s"
          >
            Text Field with Copy Action
          </Box>
          <Box
            fontSize="sbds-global-font-size-4"
            color="sbds-font-color-secondary"
            mb="sbds-dimension-space-size-m"
          >
            Click the copy icon to copy the text to clipboard
          </Box>
          <TextField
            id="copy-field"
            label="Referral Code"
            defaultValue="SHOPBACK2025"
            readOnly
            action={
              <Box position="relative">
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? "Copied" : "Copy to clipboard"}
                  className={css({
                    cursor: "pointer",
                    bg: "transparent",
                    border: "none",
                    p: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  })}
                >
                  <Rectangles
                    tone={copied ? "success" : "primary"}
                    transition="all 0.3s ease-in-out"
                  />
                </button>
              </Box>
            }
          />
        </Box>
      </Stack>
    );
  },
};

// ============================================================================
// With Prefix Dropdown
// ============================================================================

export const PrefixDropdown: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Name Field with Title Prefix
        </Box>
        <TextField
          id="name-field"
          label="Name"
          defaultValue="ShopBack"
          prefixDropdown={{
            options: [
              { value: "mr", label: "Mr." },
              { value: "mrs", label: "Mrs." },
              { value: "ms", label: "Ms." },
              { value: "dr", label: "Dr." },
            ],
            defaultValue: "mr",
          }}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Phone Number with Country Code
        </Box>
        <TextField
          id="phone-field"
          label="Number"
          defaultValue="8888 8888"
          prefixDropdown={{
            options: [
              { value: "+886", label: "+886" },
              { value: "+65", label: "+65" },
              { value: "+60", label: "+60" },
              { value: "+62", label: "+62" },
            ],
            defaultValue: "+886",
          }}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Phone Number (Disabled)
        </Box>
        <TextField
          id="phone-field-disabled"
          label="Number"
          defaultValue="8888 8888"
          disabled
          prefixDropdown={{
            options: [
              { value: "+886", label: "+886" },
              { value: "+65", label: "+65" },
              { value: "+60", label: "+60" },
              { value: "+62", label: "+62" },
            ],
            defaultValue: "+886",
          }}
        />
      </Box>
    </Stack>
  ),
};
