import {
    Select,
    SelectItem,
    SelectValue,
    SelectContent,
    SelectTrigger
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
    columnIndex: number;
    selectedColumns: Record<string, string | null>;
    onChange: (
        columnIndex: number,
        valye: string | null,
    ) => void;
};

const options = [
    "amount",
    "payee",
    "notes",
    "date"
];

export const TableHeadSelect = ({
    columnIndex,
    selectedColumns,
    onChange
}: Props) => {
    const currentSelection = selectedColumns[`column_${columnIndex}`];

    return (
        <Select
            value={currentSelection || ""}
            onValueChange={(value) => onChange(columnIndex, value)}
        >
            <SelectTrigger
                className={cn(
                    "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
                    currentSelection && "text-blue-500"
                )}
            >
                <SelectValue placeholder="Skip" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="skip">Skip</SelectItem>
                {options.map((option, index) => {
                    const disabled = Object.values(selectedColumns)
                        .includes(option) && selectedColumns[`column_${columnIndex}`]
                        !== option;

                    return (
                        <SelectItem
                            value={option}
                            key={index}
                            disabled={disabled}
                            className="capitalize"
                        >
                            {option}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}