import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddRequestForm from "./components/AddRequestForm";

enum TabName {
  Active = "Active",
  Inactive = "Inactive",
}

function Popup() {
  return (
    <div>
      <Tabs defaultValue={TabName.Active}>
        <TabsList>
          <TabsTrigger value={TabName.Active}>添加规则</TabsTrigger>
          <TabsTrigger value={TabName.Inactive}>修改请求</TabsTrigger>
        </TabsList>
        <TabsContent value={TabName.Active}>
          <Card>
            <CardHeader>添加规则</CardHeader>
            <CardContent>
              <AddRequestForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value={TabName.Inactive}>
          <Card title="aa">
            <AddRequestForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Popup;
