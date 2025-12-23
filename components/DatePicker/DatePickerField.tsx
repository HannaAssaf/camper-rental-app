"use client";

import { useMemo, useState } from "react";
import { Popover, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import css from "./DatePickerField.module.css";
import Icon from "../Icon/Icon";

type Props = {
  name?: string;
  required?: boolean;
  value?: Date | null;
  onChange?: (value: Date | null) => void;

  minDate?: Date;
  maxDate?: Date;

  labelClosed?: string;
  labelOpened?: string;
};

export default function DatePickerField({
  name = "date",
  required = true,
  value = null,
  onChange,
  minDate,
  maxDate,
  labelClosed = "Booking date*",
  labelOpened = "Select a date between today",
}: Props) {
  const [opened, setOpened] = useState(false);

  const today = useMemo(() => new Date(), []);
  const _minDate = minDate ?? today;
  const _maxDate = useMemo(
    () => maxDate ?? dayjs(today).add(1, "year").toDate(),
    [maxDate, today]
  );

  const displayValue = value ? dayjs(value).format("DD MMMM YYYY") : "";
  const placeholder = opened ? labelOpened : labelClosed;

  return (
    <div className={css.wrapper}>
      <input
        type="date"
        name={name}
        required={required}
        value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
        readOnly
        className={css.hiddenDate}
        tabIndex={-1}
        aria-hidden="true"
      />

      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom-start"
        offset={8}
        withinPortal={false}
        shadow="md"
        radius="md"
        classNames={{ dropdown: css.dropdown }}
      >
        <Popover.Target>
          <div>
            <TextInput
              value={displayValue}
              placeholder={placeholder}
              readOnly
              classNames={{
                input: value ? css.inputSelected : css.input,
              }}
              onClick={() => setOpened(true)}
              onFocus={() => setOpened(true)}
            />
          </div>
        </Popover.Target>

        <Popover.Dropdown className={css.dropdown}>
          <DatePicker
            value={value}
            onChange={(d) => {
              if (typeof d === "string") {
                onChange?.(d ? dayjs(d).toDate() : null);
              } else {
                onChange?.(d);
              }
              setOpened(false);
            }}
            minDate={_minDate}
            maxDate={_maxDate}
            firstDayOfWeek={1}
            weekdayFormat="ddd"
            size="sm"
            previousIcon={
              <Icon
                name="calendar-nav-left"
                className={css.navSvg}
                width={20}
                height={20}
              />
            }
            nextIcon={
              <Icon
                name="calendar-nav-right"
                className={css.navSvg}
                width={20}
                height={20}
              />
            }
            classNames={{
              calendarHeader: css.calendarHeader,
              calendarHeaderControl: css.navBtn,
              calendarHeaderLevel: css.monthTitle,
              weekdaysRow: css.weekdaysRow,
              weekday: css.weekday,
              day: css.day,
            }}
          />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
