import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LegalInformation() {
  return (
    <div className="px-24 mx-auto p-4 bg-[#ffe5d9] min-h-screen">
      <h1 className="text-[#9d8189] text-2xl font-bold mb-6">Legal Information</h1>

      <Tabs defaultValue="privacy">
        <TabsList className="mb-4">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <h2 className="text-[#9d8189] text-xl font-semibold mb-4">Privacy Policy</h2>
          <p className="text-[#9d8189] mb-4">Last updated: February 8, 2025</p>
          <p className="text-[#9d8189] mb-4">
            At STEM Mentorship Platform, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our website and services.
          </p>
          {/* Add more privacy policy content here */}
        </TabsContent>

        <TabsContent value="terms">
          <h2 className="text-[#9d8189] text-xl font-semibold mb-4">Terms of Service</h2>
          <p className="text-[#9d8189] mb-4">Last updated: February 8, 2025</p>
          <p className="text-[#9d8189] mb-4">
            Welcome to STEM Mentorship Platform. By using our website and services, you agree to comply with and be
            bound by the following terms and conditions of use.
          </p>
          {/* Add more terms of service content here */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

