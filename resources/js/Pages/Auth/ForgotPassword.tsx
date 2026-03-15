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

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 relative">
            <Head title="Forgot Password" />

            <div className="w-full max-w-sm md:max-w-3xl flex flex-col gap-6">
                <Card className="overflow-hidden p-0 shadow-lg">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form className="p-6 md:p-8" onSubmit={submit}>
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Reset Password</h1>
                                    <p className="text-balance text-muted-foreground text-sm">
                                        Forgot your password? No problem. Just let us know your email
                                        address and we will email you a password reset link.
                                    </p>
                                </div>

                                {status ? (
                                    <div className="rounded-lg bg-green-50s border border-green-200 p-4 text-center text-sm text-green-600 font-medium">
                                        {status}
                                    </div>
                                ) : (
                                    <>
                                        <Field>
                                            <FieldLabel htmlFor="email">Email address</FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                placeholder="m@example.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                disabled={processing}
                                                isFocused={true}
                                            />
                                            <InputError message={errors.email} className="mt-2 text-center" />
                                        </Field>

                                        <Field>
                                            <Button type="submit" disabled={processing} className="w-full">
                                                {processing ? 'Sending...' : 'Email Password Reset Link'}
                                            </Button>
                                        </Field>
                                    </>
                                )}

                                <FieldDescription className="text-center mt-4">
                                    Remembered your password?{' '}
                                    <Link href={route('login')} className="underline underline-offset-4 hover:text-primary">
                                        Sign in
                                    </Link>
                                </FieldDescription>
                            </FieldGroup>
                        </form>
                        
                        <div className="relative hidden bg-muted md:block bg-black">
                            <img
                                src="/images/forgot-password-bg.png"
                                alt="Forgot password background"
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
