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

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
} from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { useToast } from '@/components/ui/toast/use-toast'
import { Input } from '@/components/ui/input'
import { useBoulders } from '@/stores/boulders'


const { toast } = useToast()

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { Boulder } from '@/stores/boulders'

// setup store
const { boulders, add } = useBoulders();


// form handling
const formSchema = toTypedSchema(z.object({
    name: z.string().min(3).max(20),
    description: z.string().min(3).max(200),
    distance: z.number().min(1),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})
const emit = defineEmits(['update:open']);
const props = defineProps(['open']);

// form submission
const onSubmit = handleSubmit(async (values) => {
    try {
        await add({
            name: values.name, 
            description: values.description, 
            distance: values.distance
        } as Boulder);
        toast({
            title: 'A boulder to push',
            description: `${values.name}, a new goal to conquer.`,
        });
        emit('update:open', false);
    } catch (error) {
        toast({
            title: 'Something went wrong',
            description: 'An error occurred while creating the account.',
        });
    }
})
</script>

<template>
    <Dialog :open="props.open" @update:open="$emit('update:open', $event)">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create boulder</DialogTitle>
                <DialogDescription>
                    Push a boulder, start working on something new. You must give the void its colors.
                </DialogDescription>
            </DialogHeader>
            <form class="space-y-4" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Draw" v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Create 5 new doodles, focus on getting the idea down."
                                v-bind="componentField" />
                        </FormControl>
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="distance">
                    <FormItem>
                        <FormLabel>Distance</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder=5 v-bind="componentField" />
                        </FormControl>
                        <FormDescription>
                            Push your boulder forward. You define the distance, you'll rate your daily performance out
                            of this number.
                        </FormDescription>
                    </FormItem>
                </FormField>
                <DialogFooter>
                    <Button type="submit">
                        Start pushing
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>