<script setup lang='ts'>
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { useAuthStore } from '@/stores/auth'
import type { AppwriteException } from 'appwrite'

const formSchema = toTypedSchema(z.object({
    nickname: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const auth = useAuthStore()
const onSubmit = handleSubmit(async ({ nickname, email, password }) => {
    try {
        await auth.register(email, password, nickname)
        router.push('/')
    } catch (error) {
        if ((error as AppwriteException).type === 'user_already_exists') {
            toast({
                title: 'Something went wrong',
                description: 'A user with the same id, email, or phone already exists in this project.',
            });
        } else {
            toast({
                title: 'Something went wrong',
                description: 'An error occurred while creating the account.',
            });
        }
    }
})

const handleLogin = () => {
    router.push('/login')
}

const usernameDefault = 'Sisyphys-' + Math.random().toString(16).substr(2, 4);
</script>

<template>
    <Card class="w-[350px] h-min mx-auto">
        <div class="flex justify-center mt-8">
            <Logo size="lg" />
        </div>

        <CardHeader>
            <CardTitle>Join Sisyphus</CardTitle>
            <CardDescription>One must imagine Sisyphus happy.</CardDescription>
        </CardHeader>
        <CardContent>
            <form class="space-y-4" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="nickname">
                    <FormItem>
                        <FormLabel>Nickname</FormLabel>
                        <FormControl>
                            <Input type="text" :placeholder="usernameDefault" v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>
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
                        Create
                    </Button>
                    <Button variant="outline" @click="handleLogin">
                        <ChevronRight class="w-4 h-4" /> Have an account?
                    </Button>
                </CardFooter>

            </form>
        </CardContent>
    </Card>
</template>