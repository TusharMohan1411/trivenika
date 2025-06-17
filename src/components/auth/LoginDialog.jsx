"use client";

import React, { useState } from 'react';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Zod schema for phone-only form
const phoneSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, { message: "Enter a valid 10-digit phone number" }),
});

const AuthDialog = ({ open, onOpenChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const form = useForm({
        resolver: zodResolver(phoneSchema),
        defaultValues: { phone: '' },
        mode: 'onTouched',
    });

    const handlePhoneSignIn = form.handleSubmit(async (values) => {
        setErrorMsg('');
        setIsLoading(true);

        try {
            const result = await signIn('otp', {
                redirect: false,
                phone: values.phone,
                sessionId: 'ABCX',
                otp: '8568',
            });

            if (result?.error) {
                if (result.error.includes('Invalid user')) {
                    setErrorMsg('Admin users must login through the admin panel');
                } else {
                    setErrorMsg(result.error);
                }
            } else {
                onOpenChange(false);
                window.location.href = result?.url || '/';
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMsg(error ? error.message : 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 border-0 overflow-hidden bg-gradient-to-br from-[#f0f7ff] to-[#e6f2ff]">
                <div className="p-8">
                    <DialogHeader>
                        <DialogTitle className="text-center text-3xl font-bold text-[#003366] mb-5">
                            Welcome to CA Vakeel
                        </DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={handlePhoneSignIn} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="8569856985"
                                                className="py-5 px-4"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full py-5" disabled={isLoading}>
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Button>

                            {errorMsg && (
                                <p className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                    {errorMsg}
                                </p>
                            )}
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
