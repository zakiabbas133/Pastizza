import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // optional: focus when component mounts on larger screens
    // inputRef.current?.focus();
  }, []);

  return (
    <div className="search-bar" role="search" aria-label="Search menu items">
      <div className="search-bar__glass">
        <Search size={18} className="search-bar__icon" />
        <input
          ref={inputRef}
          className="search-bar__input"
          type="search"
          placeholder="Search dishes, ingredients, tags..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search menu items"
        />
      </div>
    </div>
  );
}
