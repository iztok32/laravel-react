import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/Components/ui/field';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 relative">
            <Head title="Reset Password" />

            <div className="w-full max-w-sm md:max-w-3xl flex flex-col gap-6">
                <Card className="overflow-hidden p-0 shadow-lg">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form className="p-6 md:p-8" onSubmit={submit}>
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Create New Password</h1>
                                    <p className="text-balance text-muted-foreground text-sm">
                                        Your new password must be different from previously used passwords.
                                    </p>
                                </div>

                                <Field>
                                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        disabled={processing}
                                        autoComplete="username"
                                    />
                                    <InputError message={errors.email} className="mt-2 text-center" />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        disabled={processing}
                                        isFocused={true}
                                        autoComplete="new-password"
                                    />
                                    <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                                    <InputError message={errors.password} className="mt-2 text-center" />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        disabled={processing}
                                        autoComplete="new-password"
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2 text-center" />
                                </Field>

                                <Field>
                                    <Button type="submit" disabled={processing} className="w-full">
                                        {processing ? 'Resetting password...' : 'Reset Password'}
                                    </Button>
                                </Field>
                                
                                <FieldDescription className="text-center mt-4">
                                    <Link href={route('login')} className="underline underline-offset-4 hover:text-primary">
                                        Back to login
                                    </Link>
                                </FieldDescription>
                            </FieldGroup>
                        </form>

                        <div className="relative hidden bg-muted md:block bg-black">
                            <img
                                src="/images/reset-password-bg.png"
                                alt="Reset password background"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="px-6 text-center text-sm text-balance text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    );
}
