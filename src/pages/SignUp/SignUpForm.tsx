import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { onRegister } from '../../utils';

interface SignUpFormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const schema: ZodType<SignUpFormData> = z
        .object({
            first_name: z.string().min(3).max(255),
            last_name: z.string().min(3).max(255),
            email: z.string().email(),
            password: z.string().min(8).max(255),
            password_confirmation: z.string().min(8).max(255),
        })
        .refine((data) => data.password === data.password_confirmation, {
            path: ['confirmPassword'],
            message: "Password don't match",
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(values: SignUpFormData) {
        await onRegister(values);
        // return redirect('/dashboard');
    }
    return (
        <Flex
            minH={'87vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl
                                        id="first_name"
                                        isInvalid={errors.first_name}
                                        isRequired
                                    >
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            {...register('first_name')}
                                        />
                                        <FormErrorMessage>
                                            {errors.first_name &&
                                                errors.first_name?.message?.toString()}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        id="last_name"
                                        isInvalid={errors.last_name}
                                        isRequired
                                    >
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            {...register('last_name')}
                                        />
                                        <FormErrorMessage>
                                            {errors.last_name &&
                                                errors.last_name?.message?.toString()}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl
                                id="email"
                                isInvalid={errors.email}
                                isRequired
                            >
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" {...register('email')} />
                                <FormErrorMessage>
                                    {errors.email &&
                                        errors.email?.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                id="password"
                                isInvalid={errors.password}
                                isRequired
                            >
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        {...register('password')}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword(
                                                    (showPassword) =>
                                                        !showPassword
                                                )
                                            }
                                        >
                                            {showPassword ? (
                                                <ViewIcon />
                                            ) : (
                                                <ViewOffIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                    {/* <FormErrorMessage>
                                        {errors.password &&
                                            errors.password?.message?.toString()}
                                    </FormErrorMessage> */}
                                </InputGroup>
                            </FormControl>
                            <FormControl
                                id="password_confirmation"
                                isInvalid={errors.password_confirmation}
                                isRequired
                            >
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        {...register('password_confirmation')}
                                    />
                                    {/* <FormErrorMessage>
                                        {errors.password_confirmation &&
                                            errors.password_confirmation?.message?.toString()}
                                    </FormErrorMessage> */}
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user?{' '}
                                    <Link color={'blue.400'} href="/signin">
                                        Login
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
