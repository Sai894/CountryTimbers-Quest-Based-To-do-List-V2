"use client";

import {
	Box,
	Button,
	Heading,
	Input,
	Badge,
	Switch,
	useColorMode,
	Stack,
	HStack,
	VStack,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function TestPage() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [val, setVal] = useState("");

	return (
		<Box p={8}>
			<VStack spacing={6} align="start">
				<HStack justify="space-between" w="full">
					<Heading size="lg">Chakra UI Examples</Heading>
					<HStack>
						<Text>{colorMode === "light" ? "Light" : "Dark"}</Text>
						<Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
					</HStack>
				</HStack>

				<Stack direction={["column", "row"]} spacing={4} align="center">
					<Button colorScheme="teal">Primary</Button>
					<Button colorScheme="blue" variant="outline">
						Outline
					</Button>
					<Button colorScheme="green" variant="ghost">
						Ghost
					</Button>
					<Badge colorScheme="purple">New</Badge>
				</Stack>

				<Box w="full" maxW="md">
					<Text mb={2}>Input example</Text>
					<Input
						placeholder="Type something..."
						value={val}
						onChange={(e) => setVal(e.target.value)}
					/>
				</Box>

				<Box>
					<Text>Current input value: {val || "(empty)"}</Text>
				</Box>
			</VStack>
		</Box>
	);
}

