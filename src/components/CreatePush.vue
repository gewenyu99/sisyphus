<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'


import { useForm } from 'vee-validate'

import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { usePushes } from '@/stores/pushes';

const pushes = usePushes();

const formSchema = toTypedSchema(z.object({
    distance: z.number().min(1),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const props = defineProps(['open', 'boulderId', 'distance']);
const emit = defineEmits(['update:open']);

const onSubmit = handleSubmit(async (values) => {
    try {
        await pushes.push(values.distance, props.boulderId);
        toast({
            title: 'Cheers',
            description: `Here's to the next push.`,
        });
        emit('update:open', false);
    } catch (error) {
        toast({
            title: 'Something went wrong',
            description: 'An error occurred while pushing the boulder.',
        });
    }

})


</script>

<template>
    <Dialog :open="props.open" @update:open="$emit('update:open', $event)">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Push</DialogTitle>
                <DialogDescription>
                    How far did you push your boulder today?
                    Your goal is {{ distance }}.
                </DialogDescription>
            </DialogHeader>
            <form class="space-y-4" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="distance">
                    <FormItem>
                        <FormLabel>Distance</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder=5 v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>
                <DialogFooter>
                    <Button type="submit">
                        Push
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>