<script setup lang='ts'>
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ChevronRight } from 'lucide-vue-next'
import router from '../router/index'
import Logo from '@/components/Logo.vue'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { useAppwriteStore } from '@/stores/appwrite'
const appwrite = useAppwriteStore();

if (appwrite.isLoggedIn) {
    router.push('/');
}

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(8),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
    try {
        await appwrite.login(values.email, values.password);
        router.push('/');
    } catch (error) {
        if (error.type === 'user_password_mismatch') {
            toast({
                title: 'user_invalid_credentials',
                description: 'The email and password provided are not valid.',
            });
        } else if (error.type === 'password_recently_used') {
            toast({
                title: 'Something went wrong',
                description: 'The password you are trying to use is similar to your previous password. For your security, please choose a different password and try again.',
            });
        } else if (error.type === 'password_personal_data') {
            toast({
                title: 'Something went wrong',
                description: 'The password you are trying to use contains references to your name, email, phone or userID. For your security, please choose a different password and try again.',
            });
        } else {
            toast({
                title: 'Something went wrong',
                description: 'An error occurred while creating the account.',
            });
        }
    }
})

const handleJoinSisyphus = () => {
    router.push('/create')
}
</script>

<template>
    <Card class="w-[350px] h-min">
        <div class="flex justify-center mt-8">
            <Logo size="lg" />
        </div>
        <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>One must imagine Sisyphus happy.</CardDescription>
        </CardHeader>
        <CardContent>
            <form class="space-y-4" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="voyager@sisyphys.com" v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="********" v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>

                <CardFooter class="px-0 pt-6 lex justify-between">
                    <Button type="submit">
                        Login
                    </Button>
                    <Button variant="outline" @click="handleJoinSisyphus">
                        <ChevronRight class="w-4 h-4" /> Join Sisyphus
                    </Button>
                </CardFooter>
            </form>
        </CardContent>
    </Card>
</template>