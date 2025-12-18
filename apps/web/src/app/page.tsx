"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
} from "@inset/ui/alert-dialog";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen gap-8">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-secondary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-200 ease-in-out"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <MoonIcon className="h-4 w-4" />
        ) : (
          <SunIcon className="h-4 w-4" />
        )}
      </button>
      <div className="absolute top-4 left-4">Test nested dialogs</div>

      {/* Parent Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger>Open Parent Dialog</AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogBackdrop />
          <AlertDialogPopup>
            <AlertDialogTitle>Parent Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              This is the parent dialog. When you open the nested dialog below,
              this dialog should have the data-nested-dialog-open attribute.
            </AlertDialogDescription>
            <div className="flex justify-between gap-3 mt-6">
              <AlertDialogClose>Cancel</AlertDialogClose>

              {/* Nested Alert Dialog */}
              <AlertDialog>
                <AlertDialogTrigger>Open Nested Dialog</AlertDialogTrigger>
                <AlertDialogPortal>
                  <AlertDialogBackdrop />
                  <AlertDialogPopup>
                    <AlertDialogTitle>Nested Dialog</AlertDialogTitle>
                    <AlertDialogDescription>
                      This is nested inside the parent dialog. When this is
                      open, the parent should show data-nested-dialog-open.
                    </AlertDialogDescription>
                    <div className="flex justify-end gap-3 mt-6">
                      <AlertDialogClose>Close Nested</AlertDialogClose>
                    </div>
                  </AlertDialogPopup>
                </AlertDialogPortal>
              </AlertDialog>
            </div>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  );
}
