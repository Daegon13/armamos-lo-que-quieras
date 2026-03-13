"use client";

import { useEffect, useState } from "react";
import { getAgendaAvailability, type TimeSlot } from "@/lib/agendaAvailability";

type UseAgendaAvailabilityResult = {
  isLoading: boolean;
  slots: TimeSlot[];
  error: string | null;
};

export function useAgendaAvailability(date: string): UseAgendaAvailabilityResult {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isActive = true;

    async function loadAvailability() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAgendaAvailability(date);

        if (!isActive) {
          return;
        }

        setSlots(data);
      } catch {
        if (!isActive) {
          return;
        }

        setError("No pudimos cargar los horarios. Intentá nuevamente en unos segundos.");
        setSlots([]);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadAvailability();

    return () => {
      isActive = false;
    };
  }, [date]);

  return { isLoading, slots, error };
}
