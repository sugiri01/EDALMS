
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase, supabaseAdmin } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form validation schema
const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["learner", "trainer", "admin"]),
});

export type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
  onClose: () => void;
  onSuccess: () => void;
  defaultRole?: "learner" | "trainer" | "admin";
}

export const UserForm = ({ onClose, onSuccess, defaultRole = "learner" }: UserFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: defaultRole,
    },
  });

  const handleAddUser = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      console.log(`Creating new user with role: ${data.role}, email: ${data.email}`);
      
      // First create the user using Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            role: data.role, // Include role in the user metadata
          },
        }
      });

      if (authError) {
        console.error("Auth error during signup:", authError);
        throw authError;
      }

      if (!authData.user) {
        console.error("No user data returned from auth signup");
        throw new Error("Failed to create user - no user data returned");
      }

      console.log(`User created in auth with ID: ${authData.user.id}`);

      // Use supabaseAdmin client to bypass RLS policies for profile creation
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({ 
          id: authData.user.id, 
          role: data.role, 
          full_name: data.name,
          email: data.email // Save email in profiles table for easy access
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw profileError;
      }

      console.log(`Profile created successfully with role: ${data.role}`);
      toast.success(`${data.name} added successfully as ${data.role}!`);
      
      form.reset();
      onSuccess();
    } catch (error: any) {
      console.error("Error adding user:", error);
      
      // Provide more specific error messages for common issues
      if (error.message?.includes("User already registered")) {
        toast.error(`This email is already registered. Please use a different email address.`);
      } else if (error.message?.includes("Password should be")) {
        toast.error(`Password error: ${error.message}`);
      } else {
        toast.error(`Failed to add user: ${error.message || "Unknown error"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter full name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter email address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="Set a default password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="learner">Learner</SelectItem>
                  <SelectItem value="trainer">Trainer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary text-white" disabled={isLoading}>
            {isLoading ? 'Adding...' : `Add ${form.watch("role")}`}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
