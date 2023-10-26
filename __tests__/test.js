// App.test.js
import "react-native";
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import App from "../app/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => AsyncStorageMock);

test("renders MainScreen when token exists", async () => {
  AsyncStorage.setItem("token", "tokensgs"); // Simulasikan token tersimpan
  const { getByText } = render(<App />);
  await waitFor(() => {
    expect(getByText("Your expo push token")).toBeTruthy();
  });
});

test("renders LoginScreen when token does not exist", async () => {
  AsyncStorage.removeItem("token"); // Hapus token simulasi
  const { getByText } = render(<App />);
  await waitFor(() => {
    expect(getByText("Email")).toBeTruthy();
  });
});
