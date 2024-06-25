import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import LoginForm from "./forms/login_form";

export default function LoginDialog() {
  return (
    <DialogContent className="max-w-[28%] p-6">
      <DialogHeader>
        <DialogTitle>Accedi</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Inserisci la tua email e password e clicca su accedi per continuare
      </DialogDescription>
      <LoginForm />
      <DialogFooter className="text-center text-xs opacity-50">
        {
          " Continuando, accetti i nostri termini di servizio, l'informativa sulla privacy e l'informativa sui cookie"
        }
      </DialogFooter>
    </DialogContent>
  );
}
