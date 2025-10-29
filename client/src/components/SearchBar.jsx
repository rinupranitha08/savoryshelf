import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onChange }) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text className="bg-white"><FiSearch /></InputGroup.Text>
      <FormControl
        placeholder="Search title, ingredient or category..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </InputGroup>
  );
}