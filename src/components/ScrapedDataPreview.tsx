import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/ThemeProvider";
import { Table, Text } from "@mantine/core";

export default function ScrapedDataPreview({
  scrapedData,
}: {
  scrapedData: {
    date: { [key: string]: number };
    content: { [key: string]: string };
  };
}) {
  const { theme } = useTheme(); // Use the useTheme hook

  // Transform the nested JSON data into an array of objects
  const data = Object.keys(scrapedData.date).map((key) => ({
    date: new Date(scrapedData.date[key]).toLocaleString(),
    content: scrapedData.content[key],
  }));

  return (
    <>
      <div className="hidden md:block pb-4">
        <div
          className={`overflow-x-auto rounded-lg border ${
            theme === "dark" ? "border-white" : "border-black"
          }`}
        >
          {data.length > 0 ? (
            <Table striped withColumnBorders stripedColor="gray">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Content</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.map((item, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{item.date}</Table.Td>
                    <Table.Td>{item.content}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          ) : (
            <Text>No data available</Text>
          )}
        </div>
      </div>

      <Card className="w-full bg-card text-card-foreground md:hidden">
        <CardHeader>
          <CardTitle>Scraped Data Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="border-b border-border pb-4 last:border-b-0 last:pb-0"
              >
                <p className="text-sm text-muted-foreground">{item.date}</p>
                <p className="mt-1">{item.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
