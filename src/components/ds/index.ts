/**
 * Oventric Mail design system.
 * Import product primitives from here: `import { Panel, Text } from "@/components/ds";`
 */
export * from "./tokens";
export * from "./typography";
export * from "./Panel";
export * from "./Field";
export * from "./StatusBadge";
export * from "./AiMessage";
export * from "./WorkflowSteps";
export * from "./DataTable";
export * from "./Notice";
export * from "./EmailPreview";
export * from "./ChartFrame";
export * from "./Nav";

// Re-exported shadcn primitives that the design system standardises on.
export { Button, buttonVariants } from "@/components/ui/button";
export { Input } from "@/components/ui/input";
export { Textarea } from "@/components/ui/textarea";
export { Label } from "@/components/ui/label";
export { Badge } from "@/components/ui/badge";
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export { Progress } from "@/components/ui/progress";
export { Separator } from "@/components/ui/separator";
export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
