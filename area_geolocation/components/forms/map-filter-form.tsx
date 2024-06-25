"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  provincia: z.string(),
  comune: z.string(),
  denominazione: z.string().min(2).max(50),
  tipoUDO: z.string(),
  specialita: z.string(),
  descrittori: z.string(),
  discipline: z.boolean().default(false).optional(),
  branche: z.boolean().default(false).optional(),
});

export default function MapFilterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provincia: "",
      comune: "",
      denominazione: "",
      tipoUDO: "",
      specialita: "",
      descrittori: "",
      discipline: false,
      branche: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Provincia */}
        <FormField
          control={form.control}
          name="provincia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provincia</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona la provincia in cui ricercare" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BL">BL - Belluno</SelectItem>
                  <SelectItem value="PD">PD - Padova</SelectItem>
                  <SelectItem value="RO">RO - Rovigo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Comune */}
        <FormField
          control={form.control}
          name="comune"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comune</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona il comune in cui ricercare" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ABANO">ABANO</SelectItem>
                  <SelectItem value="AGNA">AGNA</SelectItem>
                  <SelectItem value="ALBIGNASEGO">ALBIGNASEGO</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Denominazione */}
        <FormField
          control={form.control}
          name="denominazione"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Denominazione</FormLabel>
              <FormControl>
                <Input placeholder="Inserisci la denominazione di ricerca" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Tipo UDO */}
        <FormField
          control={form.control}
          name="tipoUDO"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo UDO</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona il tipo di UDO da ricercare" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TUTTE">Tutte le UDO</SelectItem>
                  <SelectItem value="ASSISTENZA PSICHIATRICA OSPEDALIERA IN ETA EVOLUTIVA">ASSISTENZA PSICHIATRICA
                    OSPEDALIERA IN ETA EVOLUTIVA</SelectItem>
                  <SelectItem value="BLOCCO PARTO PUNTO NASCITA">BLOCCO PARTO PUNTO NASCITA</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Unità di offerta socio-sanitaria</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Specialità */}
        <FormField
          control={form.control}
          name="specialita"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialità</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona le specialità da ricercare" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TUTTE">Tutte le specialità</SelectItem>
                  <SelectItem value="9999">9999 - Chirurgia Generale Modificata</SelectItem>
                  <SelectItem value="006">006 - Cardiochirurgia pediatrica</SelectItem>
                  <SelectItem value="012">006 - Chirurgia plastica modificata</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Descrittori */}
        <FormField
          control={form.control}
          name="descrittori"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrittori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona i descrittori con cui ricercare" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TUTTI">Tutti i descrittori</SelectItem>
                  <SelectItem value="C.1">C.1 - Prevenzione</SelectItem>
                  <SelectItem value="C.1.1">C.1.1 - Sorveglianza e prevenzione delle malattie infettive e
                    parassitarie</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Discipline */}
        <FormField
          control={form.control}
          name="discipline"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Discipline</FormLabel>
                <FormDescription>Ricerca per discipline</FormDescription>
              </div>
            </FormItem>
          )}
        />
        {/* Branche */}
        <FormField
          control={form.control}
          name="branche"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Branche</FormLabel>
                <FormDescription>Ricerca per branche</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center space-x-4">
          <Button type="submit" className="w-full">Submit</Button>
          <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-500/90">Clear</Button>
        </div>
      </form>
    </Form>
  );
}

