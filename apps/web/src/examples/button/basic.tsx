import { Button } from "@inset/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="destructive-outline">Destructive Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
