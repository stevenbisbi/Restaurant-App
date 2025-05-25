import { useEffect } from "react";
import {
  getAllTables,
  getTable,
  createTable,
  deleteTable,
  updateTable,
} from "../../../api/tables.api";

export function TablesAdminPage() {
  useEffect(() => {
    document.title = "Tables Admin";
    const fetchTables = async () => {
      try {
        const response = await getAllTables();
        console.log("All Tables:", response.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
  }, []);

  return <div>TablesPage</div>;
}
