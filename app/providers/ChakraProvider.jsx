"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import PropTypes from "prop-types";

// ChakraProvider expects the internal system as the `value` prop (it's
// destructured as `value: sys` inside the package). Pass the exported
// `defaultSystem` so `sys` is defined and runtime errors are avoided.
export default function ChakraProviders({ children }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}

ChakraProviders.propTypes = {
  children: PropTypes.node,
};
