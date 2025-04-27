import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  { id: "Next JS", label: "Next JS" },
  { id: "Data Dcience", label: "Data Science" },
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  { id: "MERN Stack Development", label: "MERN Stack Development" },
  { id: "Backend Development", label: "Backend Development" },
  { id: "Javascript", label: "Javascript" },
  { id: "Python", label: "Python" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "HTML", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId, isChecked) => {
    const updatedCategories = isChecked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);

    setSelectedCategories(updatedCategories);
    handleFilterChange(updatedCategories, sortByPrice);
  };

  const handleSortChange = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-4 sm:gap-x-8 ">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>

        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-48 hover:scale-105 transition-all duration-300">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      <div>
        <h1 className="font-semibold mb-2">CATEGORY</h1>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-2 my-1 hover:scale-105 transition-all duration-175"
            >
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(isChecked) =>
                  handleCategoryChange(category.id, isChecked)
                }
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
