import fs from "fs";
import { Client } from "../interface";

/**
 * Reads a CSV file at the given path and returns an array of Client objects.
 * The first line of the file is expected to contain the column headers.
 * Each subsequent line should contain the values for a single client, in the same order as the headers.
 * @param csvPath the path to the CSV file
 * @returns an array of Client objects
 */
export function readClientsFromCSV(csvPath: string): Client[] {
  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.trim().split("\n");
  const headers = lines.shift()!.split(",");

  return lines.map((line): Client => {
    const values = line.split(",");
    const client: Partial<Client> = {};

    headers.forEach((header, i) => {
      const key = header.trim() as keyof Client;
      client[key] = values[i].trim() as never;
    });

    return client as Client;
  });
}
