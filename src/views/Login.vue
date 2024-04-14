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

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(8),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})
const auth = useAuthStore();

const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
        await auth.login(email, password)
        router.push('/')
    } catch (error) {
        toast({
            title: 'Something went wrong',
            description: 'Please check your email and password and try again.',
        })
    }
})

const handleJoinSisyphus = () => {
    router.push('/register')
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