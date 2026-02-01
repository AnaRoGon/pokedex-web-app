import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { POKEMON_TYPES } from "@/Pokedex/constants/pokemon-types";

const searchIcon = (
  <i className="pi pi-search" style={{ fontSize: "1.5rem" }}></i>
);

interface Props {
  onTypeChange: (type: string) => void;
  onQueryChange: (query: string) => void;
  defaultType?: string;
  defaultQuery?: string;
}

export const CustomSearchCard = ({
  onTypeChange,
  onQueryChange,
  defaultType = "all",
  defaultQuery = "",
}: Props) => {
  const [valueType, setValueType] = useState<string>(defaultType);
  const [query, setQuery] = useState(defaultQuery);

  const handleTypeChange = (e: DropdownChangeEvent) => {
    setValueType(e.value);
    onTypeChange(e.value);
    setQuery("");
    onQueryChange("");
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleQueryBySearchButtom = () => {
    onQueryChange(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      handleQueryBySearchButtom();
    }
  };

  const startContent = (
    <div className="flex flex-row m-10 gap-3">
      <InputText
        data-testid="search-input-test"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        icon={searchIcon}
        aria-label="Search"
        onClick={handleQueryBySearchButtom}
      ></Button>
    </div>
  );

  const endContent = (
    <React.Fragment>
      <div className="card flex justify-content-center">
        <div className="m-10">
          <Dropdown
            value={valueType}
            onChange={handleTypeChange}
            options={POKEMON_TYPES}
            placeholder="Select a type"
            className="p-2 gap-11"
          />
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <Card
      title="Search Options"
      className="p-6 mb-8 max-w-4xl mx-auto border-none hover:translate-y-0!"
    >
      <Toolbar start={startContent} end={endContent} />
    </Card>
  );
};
