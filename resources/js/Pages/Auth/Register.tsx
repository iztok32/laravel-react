import { Head, Link, useForm } from '@inertiajs/react';
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/Components/ui/field"
import InputError from '@/Components/InputError';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 relative">
            <Head title="Register" />
            <div className="w-full max-w-sm md:max-w-4xl flex flex-col gap-6">
                <Card className="overflow-hidden p-0 shadow-lg">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form className="p-6 md:p-8" onSubmit={submit}>
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Create an account</h1>
                                    <p className="text-sm text-balance text-muted-foreground">
                                        Enter your details to create your account
                                    </p>
                                </div>

                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        disabled={processing}
                                        autoComplete="name"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        disabled={processing}
                                        autoComplete="username"
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                    <FieldDescription>
                                        We will send you a confirmation email.
                                    </FieldDescription>
                                </Field>

                                <Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field>
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                                disabled={processing}
                                                autoComplete="new-password"
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                                            <Input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                                disabled={processing}
                                                autoComplete="new-password"
                                            />
                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </Field>
                                    </div>
                                    <FieldDescription>
                                        Must be at least 8 characters long.
                                    </FieldDescription>
                                </Field>

                                <Field>
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        {processing ? 'Creating account...' : 'Create account'}
                                    </Button>
                                </Field>

                                <FieldDescription className="text-center">
                                    Already have an account? <Link href={route('login')} className="underline hover:text-primary">Sign in</Link>
                                </FieldDescription>
                            </FieldGroup>
                        </form>
                        <div className="relative hidden bg-muted md:block bg-black">
                            <img
                                src="/images/signup-bg.png"
                                alt="Signup background"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>
                <div className="px-6 text-center text-sm text-balance text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    );
}
