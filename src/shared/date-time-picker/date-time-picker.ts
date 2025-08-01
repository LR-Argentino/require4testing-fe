import {Component, computed, EventEmitter, Input, Output, signal} from '@angular/core';

export interface DateTimeRange {
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'app-date-time-picker',
  imports: [],
  templateUrl: './date-time-picker.html',
  styleUrl: './date-time-picker.css'
})
export class DateTimePicker {
  @Input() required = false;
  @Input() disabled = false;
  @Output() dateRangeChange = new EventEmitter<DateTimeRange>();

  // Signals für reaktive State-Management
  protected startDate = signal<Date | null>(null);
  protected endDate = signal<Date | null>(null);
  protected hasError = signal(false);

  // Computed Signals für UI-Strings
  protected startDateString = computed(() =>
    this.startDate() ? this.formatDateForInput(this.startDate()!) : ''
  );

  protected endDateString = computed(() =>
    this.endDate() ? this.formatDateForInput(this.endDate()!) : ''
  );

  protected startTimeString = computed(() =>
    this.startDate() ? this.formatTimeForInput(this.startDate()!) : '09:00'
  );

  protected endTimeString = computed(() =>
    this.endDate() ? this.formatTimeForInput(this.endDate()!) : '17:00'
  );

  // Error handling
  protected errorMessage = computed(() => {
    if (!this.required && !this.startDate() && !this.endDate()) return '';
    if (this.required && (!this.startDate() || !this.endDate())) {
      return 'Start- und Enddatum sind erforderlich';
    }
    if (this.startDate() && this.endDate() && this.startDate()! >= this.endDate()!) {
      return 'Das Enddatum muss nach dem Startdatum liegen';
    }
    return '';
  });

  // Duration calculation
  protected duration = computed(() => {
    if (!this.startDate() || !this.endDate()) return '';

    const diff = this.endDate()!.getTime() - this.startDate()!.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) return `${minutes} Min.`;
    if (minutes === 0) return `${hours} Std.`;
    return `${hours} Std. ${minutes} Min.`;
  });

  // ControlValueAccessor
  private onChange = (value: DateTimeRange) => {
  };
  private onTouched = () => {
  };

  writeValue(value: DateTimeRange): void {
    if (value) {
      this.startDate.set(value.startDate);
      this.endDate.set(value.endDate);
    }
  }

  registerOnChange(fn: (value: DateTimeRange) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event Handlers
  protected onStartDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const dateStr = target.value;

    if (dateStr) {
      const currentTime = this.startDate() || new Date();
      const newDate = new Date(dateStr);
      newDate.setHours(currentTime.getHours(), currentTime.getMinutes());
      this.startDate.set(newDate);
    } else {
      this.startDate.set(null);
    }

    this.emitChange();
  }

  protected onStartTimeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const timeStr = target.value;

    if (timeStr && this.startDate()) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const newDate = new Date(this.startDate()!);
      newDate.setHours(hours, minutes);
      this.startDate.set(newDate);
    } else if (timeStr && !this.startDate()) {
      // Wenn nur Zeit eingegeben wird, nutze heute als Datum
      const today = new Date();
      const [hours, minutes] = timeStr.split(':').map(Number);
      today.setHours(hours, minutes);
      this.startDate.set(today);
    }

    this.emitChange();
  }

  protected onEndDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const dateStr = target.value;

    if (dateStr) {
      const currentTime = this.endDate() || new Date();
      const newDate = new Date(dateStr);
      newDate.setHours(currentTime.getHours(), currentTime.getMinutes());
      this.endDate.set(newDate);
    } else {
      this.endDate.set(null);
    }

    this.emitChange();
  }

  protected onEndTimeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const timeStr = target.value;

    if (timeStr && this.endDate()) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const newDate = new Date(this.endDate()!);
      newDate.setHours(hours, minutes);
      this.endDate.set(newDate);
    } else if (timeStr && !this.endDate()) {
      const today = new Date();
      const [hours, minutes] = timeStr.split(':').map(Number);
      today.setHours(hours, minutes);
      this.endDate.set(today);
    }

    this.emitChange();
  }

  private emitChange(): void {
    const value: DateTimeRange = {
      startDate: this.startDate(),
      endDate: this.endDate()
    };

    this.hasError.set(!!this.errorMessage());
    this.onChange(value);
    this.dateRangeChange.emit(value);
    this.onTouched();
  }

  // Utility Methods
  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatTimeForInput(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  protected formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}
