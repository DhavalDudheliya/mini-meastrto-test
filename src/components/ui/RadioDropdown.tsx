"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useRef, useEffect, RefObject } from "react";

const RadioDropdown = ({
  type,
  uniqueName,
  uniqueId,
  onChange,
  defaultSelected,
}: {
  type: "status" | "language" | "couponStatus";
  uniqueName: string;
  uniqueId: string;
  onChange: (option: { label: string; color: string; id: string }) => void;
  defaultSelected: string;
}) => {
  const t = useTranslations();

  const statusDropdown = [
    {
      label: t("waiting_confirmation"),
      color: "text-[var(--blue-500)]",
      id: "waiting-confirmation",
      icon: null,
    },
    {
      label: t("accepted"),
      color: "text-[var(--blue-500)]",
      id: "accepted",
      icon: null,
    },
    {
      label: t("processing"),
      color: "text-[var(--yellow)]",
      id: "processing",
      icon: null,
    },
    {
      label: t("shipped"),
      color: "text-[var(--orange)]",
      id: "shipped",
      icon: null,
    },
    {
      label: t("delivered"),
      color: "text-[var(--green)]",
      id: "delivered",
      icon: null,
    },
  ];

  const languageDropdown = [
    {
      label: "English",
      color: "text-[var(--blue)]",
      id: "en",
      icon: "/images/usa_flag.webp",
    },
    {
      label: "Swedish",
      color: "text-[var(--pink-500)]",
      id: "sv",
      icon: "/images/sweden_flag.png",
    },
  ];

  const couponStatusDropdown = [
    {
      label: t("active"),
      color: "text-green-500",
      id: "active",
      icon: null,
    },
    {
      label: t("inactive"),
      color: "text-red-500",
      id: "inactive",
      icon: null,
    },
  ];

  const options = type === "status" ? statusDropdown : type === "language" ? languageDropdown : couponStatusDropdown;

  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("dropdown-down"); // default position
  const dropdownRef: RefObject<HTMLDivElement> = useRef(null);
  const buttonRef: RefObject<HTMLButtonElement> = useRef(null);

  useEffect(() => {
    if (defaultSelected) {
      const toSearch = type === "status" ? statusDropdown : type === "language" ? languageDropdown : couponStatusDropdown;

      setSelectedValue(
        toSearch.find((option) => option.id === defaultSelected) ||
          languageDropdown[0]
      );
    }
  }, [defaultSelected]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const calculateDropdownPosition = () => {
    if (dropdownRef.current && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < dropdownRect.height) {
        setDropdownPosition("dropdown-up");
      } else {
        setDropdownPosition("dropdown-down");
      }
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      calculateDropdownPosition();
    }
  }, [isDropdownOpen]);

  const handleValueSelect = (option: {
    label: string;
    color: string;
    id: string;
    icon: string | null;
  }) => {
    setSelectedValue(option);
    onChange(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown-list-wrapper w-min relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="bg-[var(--green-50)] dropdown-list-btn rounded-2xl flex items-center justify-between gap-2">
        {selectedValue ? (
          <span className={`hidden md:inline-block ${selectedValue.color} font-bold`}>
            {selectedValue.label}
          </span>
        ) : (
          "None"
        )}
        {selectedValue ? (
          <span className={`inline-block md:hidden ${selectedValue.color} font-bold`}>
            {selectedValue.label.slice(0, 2)}
          </span>
        ) : (
          "None"
        )}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.46967 7.03033C5.76256 7.32322 6.23744 7.32322 6.53033 7.03033L11.3033 2.25736C11.5962 1.96447 11.5962 1.48959 11.3033 1.1967C11.0104 0.903806 10.5355 0.903806 10.2426 1.1967L6 5.43934L1.75736 1.1967C1.46447 0.903806 0.989592 0.903806 0.696699 1.1967C0.403806 1.48959 0.403806 1.96447 0.696699 2.25736L5.46967 7.03033ZM5.25 5.5V6.5H6.75V5.5H5.25Z"
            fill="black"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={`shadow-2xl dropdown-list absolute ${dropdownPosition} bg-[var(--green-50)] w-full px-5 py-4 rounded-2xl border border-gray-200`}>
          <div className="flex flex-col gap-4 h-auto">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex h-full items-center justify-between">
                <input
                  type="radio"
                  id={`${uniqueId}-${option.id}`}
                  name={uniqueName}
                  value={option.id}
                  checked={selectedValue.id === option.id}
                  className="mr-2"
                />
                <label
                  onClick={() => handleValueSelect(option)}
                  htmlFor={`${uniqueId}-${option.id}`}
                  className={`font-bold text-[16px] ${option.color}`}>
                  <span className="flex items-center justify-center gap-1 flex-row h-5">
                    {option?.icon && (
                      <Image
                        width={20}
                        height={20}
                        alt="flag"
                        src={option.icon}
                        className="w-4 h-[10px] object-cover"
                      />
                    )}
                    <span className="hidden md:inline-block">
                      {option.label}
                    </span>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RadioDropdown;
