import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
} from '@chakra-ui/react';
import z, { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { onLogin } from '../../utils';
// import { redirect } from 'react-router-dom';

interface SignInFormData {
    email: string;
    password: string;
}

export default function SignInForm() {
    const schema: ZodType<SignInFormData> = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(255),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(values: SignInFormData) {
        await onLogin(values);
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
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool{' '}
                        <Link color={'blue.400'} href="/features">
                            features
                        </Link>{' '}
                        ✌️
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
                            <FormControl id="email" isInvalid={errors.email}>
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
                            >
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    {...register('password')}
                                />
                                <FormErrorMessage>
                                    {errors.password &&
                                        errors.password?.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>
                            <Stack spacing={5}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                >
                                    <Link color={'blue.400'}>
                                        Forgot password?
                                    </Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
