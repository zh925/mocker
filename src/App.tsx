import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddRequestForm from "./components/AddRequestForm";

enum TabName {
  AddRule = "AddRule",
  RuleList = "RuleList",
}

function App() {
  return (
    <div className="w-[700px] p-6">
      <Tabs defaultValue={TabName.RuleList}>
        <TabsList>
          <TabsTrigger value={TabName.RuleList}>规则列表</TabsTrigger>
          <TabsTrigger value={TabName.AddRule}>添加规则</TabsTrigger>
        </TabsList>
        <TabsContent value={TabName.RuleList}>
          <Card>
            <CardHeader>规则列表</CardHeader>
            <CardContent>
              <AddRequestForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value={TabName.AddRule}>
          <Card>
            <CardHeader>添加规则</CardHeader>
            <CardContent>
              <AddRequestForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
