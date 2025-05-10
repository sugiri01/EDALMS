import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, MailCheck, BarChart3, Users, Send, MoreHorizontal, Mail, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Define interfaces for email templates
interface BaseTemplate {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}

interface TemplateWithDuration extends BaseTemplate {
  hasDuration?: boolean;
}

interface TemplateWithDays extends BaseTemplate {
  hasDays?: boolean;
}

interface TemplateWithAttachment extends BaseTemplate {
  hasAttachment?: boolean;
}

type EmailTemplate = BaseTemplate | TemplateWithDuration | TemplateWithDays | TemplateWithAttachment;

// Email categories for sidebar
const emailCategories = [
  { id: "invitation", name: "Invitation and onboarding" },
  { id: "courses", name: "Course activities" },
  { id: "workshops", name: "Live workshop" },
  { id: "assignments", name: "Assignment activities" },
  { id: "test", name: "Test activities" },
  { id: "payment", name: "Payment activities" },
  { id: "group", name: "Group activity" },
  { id: "rewards", name: "Rewards" },
];

// Admin categories
const adminCategories = [
  { id: "academy", name: "Academy activities" },
  { id: "payment", name: "Payment activities" },
  { id: "workshop", name: "Live workshop" },
  { id: "group", name: "Group activity" },
];

// Email templates for different categories
const invitationTemplates: BaseTemplate[] = [
  { 
    id: "academy_enrollment", 
    name: "Academy enrollment", 
    description: "A new learner is sent a welcome email when they enroll for your academy.",
    checked: true
  },
  { 
    id: "account_confirmation", 
    name: "Account confirmation", 
    description: "An email is sent to your learner's mail box asking them to confirm their account after which they can access the academy/courses etc.",
    checked: false
  },
  { 
    id: "invitation_to_join", 
    name: "Invitation to join academy", 
    description: "An email is sent to your learner inviting them to join this academy.",
    checked: false
  },
  { 
    id: "invitation_for_course", 
    name: "Invitation for course", 
    description: "An email is sent to your learner whenever a trainer invites them to enroll for a course.",
    checked: true
  },
  { 
    id: "invitation_for_course_in_academy", 
    name: "Invitation to a course in an academy (New learner)", 
    description: "An email is sent to your learner inviting them to join this academy and also enroll for a course.",
    checked: false
  },
  { 
    id: "invitation_mail_live_workshop", 
    name: "Invitation mail - Live Workshop", 
    description: "An email is sent to your learners inviting them to register for a live workshop.",
    checked: true
  },
  { 
    id: "invitation_to_live_workshop", 
    name: "Invitation to a live workshop hosted in this academy (New learner)", 
    description: "An email is sent to your learner inviting them to join this academy and also register for a live workshop.",
    checked: false
  },
  { 
    id: "learner_blocked", 
    name: "Learner blocked", 
    description: "An email is sent to your learner when they are blocked from accessing the academy",
    checked: true
  },
  { 
    id: "account_confirmation_otp", 
    name: "Account Confirmation using OTP", 
    description: "An OTP generated email will be sent to learners for account confirmation.",
    checked: false
  },
  { 
    id: "reset_password", 
    name: "Requesting learners to reset their password", 
    description: "An email is sent to your learners asking them to reset their account password.",
    checked: false
  },
  { 
    id: "login_with_otp", 
    name: "Login with OTP", 
    description: "An email is sent to your learners asking them to login to your academy using an OTP.",
    checked: false
  },
  { 
    id: "account_deletion", 
    name: "Learner account deletion using OTP", 
    description: "An OTP generated email will be sent to learners for their account deletion.",
    checked: false
  },
];

const courseTemplates: (BaseTemplate | TemplateWithDuration | TemplateWithAttachment)[] = [
  {
    id: "reminder_to_access",
    name: "Reminder to access",
    description: "An email is sent (after the below specified number of days) to your inactive enrolled learners encouraging them to access and learn from your course.",
    checked: false,
    hasDuration: true
  },
  {
    id: "drip_lesson",
    name: "Drip lesson notification",
    description: "Notify learners via email whenever a lesson is released under drip for their enrolled course.",
    checked: false
  },
  {
    id: "course_access_approved",
    name: "Course access approved",
    description: "An email is sent to your learners notifying them that their request to access a particular course has been approved.",
    checked: false
  },
  {
    id: "course_access_denied",
    name: "Course access denied",
    description: "An email is sent to your learners notifying them that their request to access a particular course has been denied.",
    checked: false
  },
  {
    id: "course_enrollment",
    name: "Course enrollment",
    description: "An email is sent to your learner whenever they enroll for a course.",
    checked: false,
    hasAttachment: true
  },
  {
    id: "course_completion",
    name: "Course completion",
    description: "An email is sent to your learner whenever they complete a course.",
    checked: false
  },
  {
    id: "expired_course",
    name: "Expired course access",
    description: "An email is sent to your learners whenever their access to any particular course expires.",
    checked: false
  }
];

const liveWorkshopTemplates: (BaseTemplate | TemplateWithAttachment)[] = [
  {
    id: "reminder_emails",
    name: "Reminder emails to attend live lessons/workshops",
    description: "Registered learners receive email reminders on upcoming live workshops and live lessons (scheduled under a course).",
    checked: false
  },
  {
    id: "successful_registration",
    name: "Successful registration",
    description: "An email is sent to your learner confirming their registration for the live workshop.",
    checked: false,
    hasAttachment: true
  },
  {
    id: "pending_registration",
    name: "Pending registration",
    description: "An email is sent to your learner informing them that their registration for the upcoming live workshop is yet to be confirmed.",
    checked: false
  },
  {
    id: "altered_time",
    name: "Altered time/date (live workshop)",
    description: "An email is sent to your learner notifying them when a live workshop's date/time is changed.",
    checked: false
  },
  {
    id: "notification_launched",
    name: "Notification when a lesson is launched",
    description: "An email is sent to your registrants when the respective live workshop is launched.",
    checked: false
  },
  {
    id: "live_workshop_notes",
    name: "Live workshop notes",
    description: "An email is sent to your workshop participants with a copy of the notes they took during the live session.",
    checked: false
  },
  {
    id: "share_lesson_recording",
    name: "Share a lesson recording",
    description: "The recording of a particular live workshop or a live lesson (hosted under a course) is shared via email.",
    checked: false
  },
  {
    id: "live_workshop_thank",
    name: "Live workshop thank you email",
    description: "An email is sent to your learners thanking them for participating in the live workshop.",
    checked: false
  },
  {
    id: "cancelled_session",
    name: "Cancelled session notification",
    description: "An email is sent to your learners when a live workshop they've registered for has been cancelled.",
    checked: false
  },
  {
    id: "granting_access",
    name: "Granting access to pending registrants",
    description: "An email will be sent to registrants, granting them session access, even if their transactions are still pending.",
    checked: false
  }
];

const assignmentTemplates: BaseTemplate[] = [
  {
    id: "graded_assignment",
    name: "Graded Assignment",
    description: "An email is sent to your learner when their assignment has been graded.",
    checked: false
  },
  {
    id: "resubmission_granted",
    name: "Assignment resubmission granted",
    description: "An email is sent to your learner when resubmission has been granted for their assignment.",
    checked: false
  }
];

const testTemplates: BaseTemplate[] = [
  {
    id: "test_evaluated",
    name: "Test evaluated",
    description: "An email is sent to the learner when the trainer has completed evaluating their test.",
    checked: false
  },
  {
    id: "edit_test_grade",
    name: "Edit test grade",
    description: "An email will be sent to the learner when a trainer edits the test grade.",
    checked: false
  },
  {
    id: "test_attempt_deleted",
    name: "Test attempt deleted/reset",
    description: "An email is sent to the learner when their test attempt is deleted or reset by the trainer.",
    checked: false
  },
  {
    id: "edit_attempt_count",
    name: "Edit test attempt count",
    description: "An email will be sent to the learner when their test attempt count is edited.",
    checked: false
  }
];

const paymentTemplates: (BaseTemplate | TemplateWithDays | TemplateWithAttachment)[] = [
  {
    id: "subscription_payment_before",
    name: "Subscription payment reminder - Before due date",
    description: "An email is sent to your learners reminding them about the upcoming subscription payment for a course which is due in the below specified date.",
    checked: false,
    hasDays: true
  },
  {
    id: "subscription_renewal",
    name: "Subscription payment renewal",
    description: "An email is sent to your learner asking them to renew their subscription for continued access to the course.",
    checked: false,
    hasAttachment: true
  },
  {
    id: "subscription_payment_after",
    name: "Subscription payment reminder - After due date",
    description: "An email is sent to your learners informing them about a pending subscription payment for a course which has been overdue for the below specified number of days.",
    checked: false,
    hasDays: true
  },
  {
    id: "subscription_failure",
    name: "Subscription payment failure",
    description: "An email is sent to your learner notifying them whenever a course payment fails.",
    checked: false
  },
  {
    id: "course_taken_offline",
    name: "Course taken offline",
    description: "An email is sent to your learner when a course is taken offline.",
    checked: false
  },
  {
    id: "course_taken_online",
    name: "Course taken online",
    description: "An email is sent to your learner when a course they've enrolled for is republished again.",
    checked: false
  },
  {
    id: "course_deleted",
    name: "Course deleted",
    description: "An email is sent to your learner when a course is they've enrolled for is deleted.",
    checked: false
  },
  {
    id: "learner_blocked_payment",
    name: "Learner blocked",
    description: "An email is sent to your learner when they are blocked from accessing the academy.",
    checked: false
  },
  {
    id: "subscription_cancellation_by_trainer",
    name: "Subscription cancellation (by trainer)",
    description: "An email is sent to your learner when you cancel their subscription.",
    checked: false
  },
  {
    id: "subscription_cancellation_by_learner",
    name: "Subscription cancellation (by learner)",
    description: "An email is sent to your learner when they cancel their subscription.",
    checked: false
  },
  {
    id: "purchase_cancellation_by_learner",
    name: "Purchase cancellation (by learner)",
    description: "An email is sent to your learner when they cancel their ticket purchase.",
    checked: false
  },
  {
    id: "purchase_cancellation_by_trainer",
    name: "Purchase cancellation (by trainer)",
    description: "An email is sent to your learner when you cancel their ticket purchase.",
    checked: false
  },
  {
    id: "free_access_revoked",
    name: "Free access revoked",
    description: "An email is sent to your learner when you revoke their free access to a course, bundle or live workshop.",
    checked: false
  },
  {
    id: "payment_reminder",
    name: "Payment reminder",
    description: "An email will be sent to learners to remind them to pay for the course/bundle/session they are enrolled in.",
    checked: false
  }
];

const groupTemplates: BaseTemplate[] = [
  {
    id: "group_academy_invitation",
    name: "Group and Academy invitation",
    description: "A new learner can enroll the academy and join as a moderator.",
    checked: false
  },
  {
    id: "group_invitation",
    name: "Group invitation",
    description: "Existing learner invite to the group as a moderator.",
    checked: false
  }
];

const adminGroupTemplates: BaseTemplate[] = [
  {
    id: "group_admin_invitation",
    name: "Group Admin invitation",
    description: "This mail notify for group admin.",
    checked: false
  }
];

const rewardTemplates: BaseTemplate[] = [
  {
    id: "issue_reward_course",
    name: "Issue reward for course",
    description: "An email is sent to your learners when a certificate or badge is issued for the course.",
    checked: false
  },
  {
    id: "issue_reward_workshop",
    name: "Issue reward for live workshop",
    description: "An email is sent to your learners sharing the workshop certificate or badge, providing them with a sense of achievement.",
    checked: false
  },
  {
    id: "update_reward",
    name: "Update reward",
    description: "An email is sent to your learners when a certificate or badge is updated for a course or live workshop.",
    checked: false
  }
];

const academyTemplates: BaseTemplate[] = [
  {
    id: "new_comment_discussion",
    name: "New comment in the Discussion",
    description: "An email will be sent to admins when any learner or admin comments on a discussion of the lesson.",
    checked: false
  },
  {
    id: "invite_trainers",
    name: "Invite trainers to join academy",
    description: "An email invitation will be sent to trainers inviting them to the academy.",
    checked: false
  },
  {
    id: "new_post_discussion",
    name: "New post in the Discussion",
    description: "An email will be sent to admins when any learner or admin initiates a new discussion on the lesson.",
    checked: false
  },
  {
    id: "course_enrollment_admin",
    name: "Course enrollment",
    description: "An email is sent to your academy's admins and course admins whenever a learner enrolls for a course.",
    checked: false
  },
  {
    id: "request_access",
    name: "Request access",
    description: "An email is sent to your academy's admins and course admins whenever a learner requests access for a course.",
    checked: false
  },
  {
    id: "export_generated",
    name: "Export generated to admin",
    description: "An email will be sent to trainer when a export request is submitted.",
    checked: false
  },
  {
    id: "course_completion_admin",
    name: "Course completion",
    description: "An email is sent to your academy's admins and course admins whenever a learner completes a course.",
    checked: false
  },
  {
    id: "academy_enrollment_admin",
    name: "Academy enrollment",
    description: "An email is sent to your academy's admins whenever a new learner enrolls for your academy.",
    checked: false
  },
  {
    id: "assignment_submission",
    name: "Assignment submission notification",
    description: "An email is sent to the academy admins when a learner submits an assignment.",
    checked: false
  },
  {
    id: "test_submitted",
    name: "Test Submitted",
    description: "An email will be sent to the academy's admins when the learner's submitted test is pending manual evaluation.",
    checked: false
  }
];

const adminPaymentTemplates: BaseTemplate[] = [
  {
    id: "ticket_purchased",
    name: "Ticket purchased",
    description: "An email will be sent to the academy admins when a learner purchases a ticket for a live session, course, or bundle.",
    checked: false
  },
  {
    id: "subsequent_payments",
    name: "Subsequent payments",
    description: "An email will be sent to the academy admins when a learner makes subsequent payments (subscription/part payment/payment plan) to the ticket.",
    checked: false
  },
  {
    id: "ticket_cancelled",
    name: "Ticket cancelled",
    description: "An email will be sent to the academy admins when a learner cancels a purchased ticket.",
    checked: false
  }
];

const adminLiveWorkshopTemplates: BaseTemplate[] = [
  {
    id: "recording_success",
    name: "Recording success",
    description: "An email is sent to your presenters that the recording of a session is ready to download and sharing.",
    checked: false
  },
  {
    id: "reminder_emails_trainers",
    name: "Reminder emails about upcoming live sessions will be sent to trainers and co-trainers.",
    description: "This email reminder can only be sent when both the email notification setting at the academy level and the email reminder settings at the session level are enabled.",
    checked: false
  }
];

const tabCategories = {
  "invitation": invitationTemplates,
  "courses": courseTemplates,
  "workshops": liveWorkshopTemplates,
  "assignments": assignmentTemplates,
  "test": testTemplates,
  "payment": paymentTemplates,
  "group": groupTemplates,
  "rewards": rewardTemplates,
  "academy": academyTemplates,
  "adminPayment": adminPaymentTemplates,
  "adminWorkshop": adminLiveWorkshopTemplates,
  "adminGroup": adminGroupTemplates
};

const Emails = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("invitation");
  const [activeSection, setActiveSection] = useState("learners");
  const [templates, setTemplates] = useState<EmailTemplate[]>(invitationTemplates);

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    if (activeSection === "learners") {
      switch(categoryId) {
        case "invitation":
          setTemplates(invitationTemplates);
          break;
        case "courses":
          setTemplates(courseTemplates);
          break;
        case "workshops":
          setTemplates(liveWorkshopTemplates);
          break;
        case "assignments":
          setTemplates(assignmentTemplates);
          break;
        case "test":
          setTemplates(testTemplates);
          break;
        case "payment":
          setTemplates(paymentTemplates);
          break;
        case "group":
          setTemplates(groupTemplates);
          break;
        case "rewards":
          setTemplates(rewardTemplates);
          break;
        default:
          setTemplates(invitationTemplates);
      }
    } else {
      // Handle admin section
      switch(categoryId) {
        case "academy":
          setTemplates(academyTemplates);
          break;
        case "payment":
          setTemplates(adminPaymentTemplates);
          break;
        case "workshop":
          setTemplates(adminLiveWorkshopTemplates);
          break;
        case "group":
          setTemplates(adminGroupTemplates);
          break;
        default:
          setTemplates(academyTemplates);
      }
    }
  };

  // Handle switch toggle
  const handleSwitchToggle = (id: string) => {
    const updatedTemplates = templates.map(template => 
      template.id === id ? { ...template, checked: !template.checked } : template
    );
    setTemplates(updatedTemplates as EmailTemplate[]);
    
    toast({
      title: "Email notification updated",
      description: "Your email notification preference has been updated",
    });
  };

  // Get Title based on active category
  const getTitle = () => {
    if (activeSection === "learners") {
      const category = emailCategories.find(cat => cat.id === activeCategory);
      return category ? category.name : "";
    } else {
      const category = adminCategories.find(cat => cat.id === activeCategory);
      return category ? category.name : "";
    }
  };

  // Get description based on active category
  const getDescription = () => {
    switch(activeCategory) {
      case "invitation":
        return "Below are the emails sent to your prospects when they're being onboarded or invited to join your academy/courses/live workshops.";
      case "courses":
        return "Below are the emails sent to your learners based on various actions they perform in your academy. You can customize them to suit your style/preference and offer them a personalized e-learning experience.";
      case "workshops":
        return "Below are the emails sent your learners informing them about the live workshop or lesson (hosted under a course) they've registered for. You can edit these emails to suit your branding and training preferences offering personalised communication to your learners.";
      case "assignments":
        return "Below are the emails sent whenever your learners perform any action on a given assignment. You can edit these emails to suit your branding and training preferences offering personalised communication to your learners.";
      case "test":
        return "Below are the emails sent whenever there is any activity in a given test. You can edit these emails to suit your branding and training preferences offering personalised communication to your learners.";
      case "payment":
        return "Below are the emails sent to your learners on payment actions they perform in your academy. You can customise them to suit your style/preference and offer them a personalised e-learning experience.";
      case "group":
        return "Group activity description";
      case "rewards":
        return "Below are the emails sent when a certificate/badge is issued or updated for your learners. You can customize these emails to align with your branding and training preferences, providing personalized communication to your learners.";
      case "academy":
        return "Below are the list of emails sent to your academy's admins notifying them about the activities of a learner.";
      case "adminPayment":
        return "Below are the payment related email notifications sent to admins.";
      case "adminWorkshop":
        return "Below are the workshop related email notifications sent to trainers.";
      case "adminGroup":
        return "Group activity description for admins.";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Emails</h1>
      </div>
      
      <Tabs defaultValue="notification" className="mb-6">
        <div className="bg-white rounded-lg p-1 shadow-card w-fit mb-6">
          <TabsList className="bg-transparent">
            <TabsTrigger value="notification" className="data-[state=active]:bg-gray-100 flex items-center gap-2">
              <Bell size={16} />
              Notification
            </TabsTrigger>
            <TabsTrigger value="compose" className="data-[state=active]:bg-gray-100 flex items-center gap-2">
              <Send size={16} />
              Compose
            </TabsTrigger>
            <TabsTrigger value="report" className="data-[state=active]:bg-gray-100 flex items-center gap-2">
              <BarChart3 size={16} />
              Report
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-100 flex items-center gap-2">
              <Users size={16} />
              Contact Settings
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="notification">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full">
                <div className="p-4 border-b">
                  <ToggleGroup type="single" value={activeSection} onValueChange={(value) => {
                    if (value) {
                      setActiveSection(value);
                      if (value === "learners") {
                        setActiveCategory("invitation");
                        setTemplates(invitationTemplates);
                      } else {
                        setActiveCategory("academy");
                        setTemplates(academyTemplates);
                      }
                    }
                  }} className="flex flex-col w-full">
                    <ToggleGroupItem value="learners" className="w-full justify-start mb-2 data-[state=on]:bg-gray-100">
                      <Mail className="mr-2" size={16} />
                      Emails for Learners
                    </ToggleGroupItem>
                    <ToggleGroupItem value="admins" className="w-full justify-start data-[state=on]:bg-gray-100">
                      <FileText className="mr-2" size={16} />
                      Emails for Admins
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {activeSection === "learners" ? 
                      emailCategories.map((category) => (
                        <li key={category.id}>
                          <button 
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${activeCategory === category.id ? 'border-l-4 border-orange-500 bg-orange-50' : ''}`}
                            onClick={() => handleCategoryClick(category.id)}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))
                      :
                      adminCategories.map((category) => (
                        <li key={category.id}>
                          <button 
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${activeCategory === category.id ? 'border-l-4 border-orange-500 bg-orange-50' : ''}`}
                            onClick={() => handleCategoryClick(category.id)}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))
                    }
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Card>
                <div className="p-4 border-b">
                  <h2 className="font-medium text-secondary">{getTitle()}</h2>
                  <p className="text-gray-500 text-sm mt-2">
                    {getDescription()}
                  </p>
                </div>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {templates.map((template) => (
                      <li key={template.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 pr-4">
                            <div className="flex items-center mb-1">
                              <Switch 
                                id={`template-${template.id}`} 
                                checked={template.checked}
                                onCheckedChange={() => handleSwitchToggle(template.id)}
                                className="mr-2"
                              />
                              <Label htmlFor={`template-${template.id}`} className="font-medium text-secondary">
                                {template.name}
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 ml-10">{template.description}</p>
                            
                            {'hasDuration' in template && template.hasDuration && (
                              <div className="ml-10 mt-2 flex items-center">
                                <span className="text-sm mr-2">Duration of inactivity</span>
                                <Input type="number" value="3" className="w-16 h-8 px-2 text-sm" />
                                <span className="text-sm ml-2">Days</span>
                              </div>
                            )}
                            
                            {'hasDays' in template && template.hasDays && (
                              <div className="ml-10 mt-2 flex items-center">
                                <span className="text-sm mr-2">Send reminder when payment is due in</span>
                                <Input type="number" value="2" className="w-16 h-8 px-2 text-sm" />
                                <span className="text-sm ml-2">day(s)</span>
                              </div>
                            )}
                            
                            {'hasAttachment' in template && template.hasAttachment && (
                              <div className="ml-10 mt-2 flex items-center">
                                <Switch id={`attach-${template.id}`} className="mr-2" />
                                <Label htmlFor={`attach-${template.id}`} className="text-sm text-gray-600">
                                  Attach invoice with the email only for paid tickets.
                                </Label>
                              </div>
                            )}
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal size={20} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="compose">
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-card">
            <div className="mb-4 text-gray-400">
              <MailCheck size={48} />
            </div>
            <h3 className="text-xl font-medium text-secondary mb-2">Email Campaigns</h3>
            <p className="text-gray-500 text-center max-w-md mb-2">
              Please upgrade to higher plan to use this feature.
            </p>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Create targeted email campaigns to engage your learners and promote your courses.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded">
              Upgrade Now
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="report">
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-card">
            <div className="mb-4 text-gray-400">
              <BarChart3 size={48} />
            </div>
            <h3 className="text-xl font-medium text-secondary mb-2">Email Analytics</h3>
            <p className="text-gray-500 text-center max-w-md mb-2">
              Please upgrade to higher plan to use this feature.
            </p>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Track email performance including open rates, click-through rates, and conversion metrics.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded">
              Upgrade Now
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-card">
            <div className="mb-4 text-gray-400">
              <Users size={48} />
            </div>
            <h3 className="text-xl font-medium text-secondary mb-2">Contact Settings</h3>
            <p className="text-gray-500 text-center max-w-md mb-2">
              Please upgrade to higher plan to use this feature.
            </p>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Manage your contact lists, segment users, and configure subscription preferences.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded">
              Upgrade Now
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Emails;
