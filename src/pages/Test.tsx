import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Lock, Mail, ArrowRight, Github } from "lucide-react";

const LoginDesigns = () => {
  const [selectedDesign, setSelectedDesign] = useState("1");

  // Design 1: Minimalist Split Layout
  const Design1 = () => (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-blue-600 items-center justify-center">
        <div className="text-white space-y-6 p-8">
          <h1 className="text-4xl font-bold">Welcome to Stellus & Atlas</h1>
          <p className="text-lg">Your Gateway to Web3 Innovation</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button className="w-full">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Design 2: Dark Mode Centered
  const Design2 = () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-gray-800 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Stellus & Atlas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="bg-blue-600 hover:bg-blue-700">
              <Wallet className="mr-2 h-4 w-4" />
              MetaMask
            </Button>
            <Button
              variant="outline"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Wallet className="mr-2 h-4 w-4" />
              WalletConnect
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              {/* <Google className="mr-2 h-4 w-4" /> */}
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Continue with Github
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Design 3: Modern Tabs
  const Design3 = () => (
    <div className="min-h-screen bg-gradient-to-r from-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wallet">Web3</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="wallet" className="space-y-4">
              <div className="grid gap-4 mt-4">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect MetaMask
                </Button>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect WalletConnect
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="email" className="space-y-4">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
              <Button className="w-full">Sign In</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  // Design 4: Floating Card
  const Design4 = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <Card className="w-full max-w-md relative bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Lock className="h-6 w-6" />
            Secure Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Crypto Wallet
            </Button>
            <Button variant="outline" className="w-full">
              {/* <Google className="mr-2 h-4 w-4" /> */}
              Continue with Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/90 px-2 text-muted-foreground">
                Or use email
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button className="w-full">Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Design 5: Stepped Flow
  const Design5 = () => {
    const [step, setStep] = useState(1);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-3 w-3 rounded-full ${
                    step >= num ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <CardTitle>
              {step === 1 && "Choose Login Method"}
              {step === 2 && "Connect Wallet"}
              {step === 3 && "Verify Identity"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(2)}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Web3 Wallet
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(3)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email & Password
                </Button>
              </>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  Connect MetaMask
                </Button>
                <Button className="w-full" variant="outline">
                  Connect WalletConnect
                </Button>
                <Button onClick={() => setStep(3)} className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />
                <Button className="w-full">
                  Complete Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="w-full h-screen">
      <div className="p-4 border-b">
        <select
          value={selectedDesign}
          onChange={(e) => setSelectedDesign(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="1">Design 1: Minimalist Split Layout</option>
          <option value="2">Design 2: Dark Mode Centered</option>
          <option value="3">Design 3: Modern Tabs</option>
          <option value="4">Design 4: Floating Card</option>
          <option value="5">Design 5: Stepped Flow</option>
        </select>
      </div>
      <div className="w-full h-[calc(100vh-64px)]">
        {selectedDesign === "1" && <Design1 />}
        {selectedDesign === "2" && <Design2 />}
        {selectedDesign === "3" && <Design3 />}
        {selectedDesign === "4" && <Design4 />}
        {selectedDesign === "5" && <Design5 />}
      </div>
    </div>
  );
};

export default LoginDesigns;
