MERGE (c:Customer {name: "MR"})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Dealerships"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Overpayment"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Customer Dissatisfaction"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Knowledge"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Record Keeping"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Relations"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "privacy issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "privacy issues"})
MERGE (s:Subtopic {name: "Spam Calls"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "privacy issues"})
MERGE (s:Subtopic {name: "Junk Mail"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "privacy issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "privacy issues"})
MERGE (e:Entity {name: "Bryan-College Station, TX"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Lexus"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Hold Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Competence"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Dealer"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Transaction Tracking"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Hold Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "System Errors"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Deposit Requirement"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Documentation Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Yaris"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "C-HR"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "FRF Toyota Swansea"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Dishonesty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Professionalism"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Finance Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Dealers"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Outstanding Balance"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "HPI"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Finance Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Hold Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Disconnection"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Knowledge"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Transfer Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Transfer Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Approval Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Documentation Requirements"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Dealership"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "insurance claims"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "insurance claims"})
MERGE (s:Subtopic {name: "Settlement Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "insurance claims"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "insurance claims"})
MERGE (e:Entity {name: "Insurance Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Processing Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Early Termination Fee"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Billing Discrepancy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Credit Companies"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Discrepancies"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Late Fees"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Contact Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Redline Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Late Payments"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Credit Reporting"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Loan Closure Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "2020 Toyota 4Runner"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Professionalism"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "legal issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "legal issues"})
MERGE (s:Subtopic {name: "Financial Agreement Dispute"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "legal issues"})
MERGE (s:Subtopic {name: "Customer Status"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "legal issues"})
MERGE (e:Entity {name: "BBC You and Yours"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Skills"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Empathy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Hassan"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Acquisitions Team"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Availability"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Account Arrears"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Redline Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Hold Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Support During Hardship"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Direct Debits"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Manual Payments"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "financial issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "financial issues"})
MERGE (s:Subtopic {name: "Voluntary Repossession"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "financial issues"})
MERGE (s:Subtopic {name: "Social Security Impact"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "financial issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Check Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Interest Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Account Management"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "claim process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "claim process"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "claim process"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "claim process"})
MERGE (e:Entity {name: "Toyota Insurethat"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Interest Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Auto Loan"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Confirmation"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Billing Errors"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "toyota-financement.fr"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "website feedback"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "website feedback"})
MERGE (s:Subtopic {name: "User Experience"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "website feedback"})
MERGE (s:Subtopic {name: "Navigation"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "website feedback"})
MERGE (e:Entity {name: "redline.insurethat.com"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "website feedback"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "website feedback"})
MERGE (s:Subtopic {name: "User Experience"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "website feedback"})
MERGE (s:Subtopic {name: "Navigation"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "website feedback"})
MERGE (e:Entity {name: "sincerainsurance.com"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "website feedback"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "website feedback"})
MERGE (s:Subtopic {name: "User Experience"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "website feedback"})
MERGE (s:Subtopic {name: "Navigation"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "website feedback"})
MERGE (e:Entity {name: "immobilierconcept.com"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "website"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "website"})
MERGE (s:Subtopic {name: "User Experience"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "website"})
MERGE (s:Subtopic {name: "Navigation"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "website"})
MERGE (e:Entity {name: "courtage-expertise-auto.fr"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "CO"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Organization"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Dealership"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Organization"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Dealership"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Kim Lewis"})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Overpayment Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Empty Promises"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "John King"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Relations"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "FCA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "OO"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "NR"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "ME"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Contract Discrepancy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Transparency"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Down Payment Concerns"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Financial Institution"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Dealers"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Amber"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Processing Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Confirmation"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "CC"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Agreement Settlement"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Communication Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Agreement Settlement"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Communication Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Johnny"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Dreadful Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Dreadful Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "JH"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "CM"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Experience"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "MA"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Dealership"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Dealership"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Anna Bird"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "GJ"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "TH"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "AA"})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "FRF Toyota Swansea"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Stephen"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Rob"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "FRF Toyota Swansea"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Stephen"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Rob"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Bren MarMar"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Lack of Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Abigail G"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Repo Dept"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Dealership"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "review platform"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "review platform"})
MERGE (s:Subtopic {name: "User Control"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "review platform"})
MERGE (s:Subtopic {name: "Review Management"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "review platform"})
MERGE (e:Entity {name: "Trustpilot"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "OL"})
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Delinquency Reporting"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Consumer Protection"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Impact on Credit"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Toyota Insurance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Financial Ombudsman Service"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Consumer Financial Protection Bureau"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Delinquency Reporting"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Consumer Protection"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Impact on Credit"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Toyota Insurance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Financial Ombudsman Service"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Consumer Financial Protection Bureau"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "PG"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Payment Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "ST"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Knowledge"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Call Centre"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "PCP"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Knowledge"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Call Centre"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "PCP"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "KJ"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Professionalism"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "LI"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Transfer Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Lack of Follow-up"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "RI"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Skills"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Empathy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Hassan"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Acquisitions Team"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "NC"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Email Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Agent Knowledge"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Lexus"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "RH"})
MERGE (t:Topic {name: "insurance claims"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "insurance claims"})
MERGE (s:Subtopic {name: "Claim Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "insurance claims"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "insurance claims"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "insurance claims"})
MERGE (e:Entity {name: "Toyota Insurethat"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "BC"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Email Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Phone Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Chatbot Effectiveness"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Email Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Phone Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Chatbot Effectiveness"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "Adarsh Gupta"})
MERGE (t:Topic {name: "data privacy"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "data privacy"})
MERGE (s:Subtopic {name: "Data Selling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "data privacy"})
MERGE (s:Subtopic {name: "Spam Calls"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "data privacy"})
MERGE (s:Subtopic {name: "Junk Mail"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "data privacy"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "data privacy"})
MERGE (e:Entity {name: "Bryan-College Station"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "CC"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "AM"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "System Malfunction"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "DANIEL MARTINEZ"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Billing Discrepancies"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Late Fees"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Interest Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Toni Summerlin"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Karolina Polak"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Knowledge"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Transfer Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "LL"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Direct Debit Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Arrears Discrepancies"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Lack of Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Direct Debit Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Arrears Discrepancy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Lack of Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Collections Advisor"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MS"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "RC"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Iqra"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Camille Brooks"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Darwin"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "CB"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Processing Delays"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Lexus Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "DMV"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "lease buyout process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "lease buyout process"})
MERGE (s:Subtopic {name: "Documentation Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "lease buyout process"})
MERGE (s:Subtopic {name: "Payment Methods"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "lease buyout process"})
MERGE (s:Subtopic {name: "Customer Service"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "lease buyout process"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "lease buyout process"})
MERGE (e:Entity {name: "Lexus Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "lease buyout process"})
MERGE (e:Entity {name: "DMV"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Steve."})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Contact Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Redline Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "TS"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "JH"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Check Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Interest Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Late Fees"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Garbage Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MO"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Failure Notifications"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "App and Website Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "LE"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Recurring Payments"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Loan Closure Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Title Issuance"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "2020 Toyota 4Runner"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "WB"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Transaction Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Lack of Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Escalation Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Transaction Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Lack of Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Escalation Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "DB"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Efficiency"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Efficiency"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "LU"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "BBC You and Yours"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "FCA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "BBC You and Yours"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "FCA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "James Dawkins"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Hold Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "marius bogdan"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "RC"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "Dean Kandi"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Early Termination Fee"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Financing Confusion"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Credit Companies"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "LL"})
MERGE (t:Topic {name: "finance application"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "finance application"})
MERGE (s:Subtopic {name: "Approval Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "finance application"})
MERGE (s:Subtopic {name: "Documentation Requirements"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "finance application"})
MERGE (s:Subtopic {name: "Customer Experience"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "finance application"})
MERGE (e:Entity {name: "Dealership"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "finance application"})
MERGE (e:Entity {name: "Finance Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "finance application"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "finance application"})
MERGE (s:Subtopic {name: "Approval Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "finance application"})
MERGE (s:Subtopic {name: "Documentation Requirements"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "finance application"})
MERGE (s:Subtopic {name: "Customer Experience"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "finance application"})
MERGE (e:Entity {name: "Dealership"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "finance application"})
MERGE (e:Entity {name: "Finance Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "GB"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Transparency"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Redline Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Carol Macpherson"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Delays"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "TI"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Credit Bureaus"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "CW"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "GD"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Issue Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Dean Cane"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Loan Payoff"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Interest Accrual"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Internal Miscommunication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "M&T Bank"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Consumer Financial Protection Bureau"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Loan Payoff"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Interest Accrual"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Communication Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "M&T Bank"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Consumer Financial Protection Bureau"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "TW"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Queue Duration"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Automated Systems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Queue Duration"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Automated System Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "PJ"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Issue Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Lexus"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Issue Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Lexus"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MS"})
MERGE (t:Topic {name: "communication issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "communication issues"})
MERGE (s:Subtopic {name: "Language Barrier"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "communication issues"})
MERGE (s:Subtopic {name: "Clarity of Information"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "communication issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "communication issues"})
MERGE (s:Subtopic {name: "Language Barrier"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "communication issues"})
MERGE (s:Subtopic {name: "Clarity of Information"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "ES"})
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Error Acknowledgment"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Credit Score Impact"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Experian"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Equifax"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Transunion"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Error Acknowledgment"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Credit Score Impact"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Experian"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Equifax"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "credit reporting issues"})
MERGE (e:Entity {name: "Transunion"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "TI"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Johan"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "HB"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Helpfulness"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Car Lease"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Helpfulness"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Car Lease"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Nina Nia"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Double Payments"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Technical Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Double Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Technical Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Siobhan Beasley"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Negligence"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "DMV"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Attorney General's office of MA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "DMV"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Attorney General's office of MA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "James Trevino"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Deposit Delays"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Check Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Timeliness"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Check Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "RT"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Call Centre"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Call Centre"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Car Payment Service"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "TO"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Supervisor Availability"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Consumer Financial Protection Bureau"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Supervisor Availability"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Back Promises"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Consumer Financial Protection Bureau"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "EP"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accountability"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Carfax"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accountability"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Carfax"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "J D"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Website Errors"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Jessica"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Edgar"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Justin"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Website Errors"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Jessica"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Edgar"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Justin"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Bill Carr"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Efficiency"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Helpfulness"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Helpfulness"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Efficiency"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "Maame “Maamele” Efuah"})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Delay in Refund"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Customer Trust"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Delay in Refund"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Customer Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Trust Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MS"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Service Representative"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Autopay"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Service Representative"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "PB"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "RO"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Financial Ombudsman"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Financial Ombudsman"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "SC San"})
MERGE (t:Topic {name: "purchase experience"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "purchase experience"})
MERGE (s:Subtopic {name: "Process Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "purchase experience"})
MERGE (s:Subtopic {name: "Time Consumption"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "purchase experience"})
MERGE (e:Entity {name: "Honda"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "purchase experience"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "purchase experience"})
MERGE (s:Subtopic {name: "Process Difficulty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "purchase experience"})
MERGE (s:Subtopic {name: "Time Consumption"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "purchase experience"})
MERGE (e:Entity {name: "Honda"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "KN"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Financing Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Interest Rate Discrepancies"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Application Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Schottenkirk Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Navy Credit Union"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Financing Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Interest Rate Discrepancies"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Application Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Schottenkirk Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Navy Credit Union"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "IA"})
MERGE (t:Topic {name: "claim process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "claim process"})
MERGE (s:Subtopic {name: "Incorrect Information"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "claim process"})
MERGE (s:Subtopic {name: "Document Retrieval"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "claim process"})
MERGE (e:Entity {name: "Maintenance Auto Plan"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "claim process"})
MERGE (e:Entity {name: "Dealer Office"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "claim process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "claim process"})
MERGE (s:Subtopic {name: "Incorrect Information"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "claim process"})
MERGE (s:Subtopic {name: "Document Retrieval"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "claim process"})
MERGE (s:Subtopic {name: "Claim Denial"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "claim process"})
MERGE (e:Entity {name: "Maintenance Auto Plan"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "claim process"})
MERGE (e:Entity {name: "Dealer Office"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Chloe Moir"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Knowledgeable Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Solutions Team"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Tyesha"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Knowledge"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Customer Solutions Team"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Tyesha"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "CS"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Account Access"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Automated Response"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Payment Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Account Access"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Automated Response"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Payment Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Carl Ferguson"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Account Access"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "account access"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "account access"})
MERGE (s:Subtopic {name: "Login Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "account access"})
MERGE (s:Subtopic {name: "Customer Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "DI"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Customer Retention"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Customer Satisfaction"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MF"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Affordability Check"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Credit Check"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Car Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Affordability Check"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Credit Approval"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "niamhyhotmail.co.uk"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Financial Ombudsman Service"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Financial Ombudsman Service"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MR"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Issue Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TIDE Bank"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "finance team"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Issue Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TIDE Bank"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "finance team"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "TR"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "FCA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "FCA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "GD"})
MERGE (t:Topic {name: "product quality"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "product quality"})
MERGE (s:Subtopic {name: "Warranty Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "product quality"})
MERGE (s:Subtopic {name: "Repair Costs"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "product quality"})
MERGE (s:Subtopic {name: "Vehicle Reliability"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "product quality"})
MERGE (e:Entity {name: "Arnold Clark"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "product quality"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "product quality"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "product quality"})
MERGE (s:Subtopic {name: "Warranty Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "product quality"})
MERGE (s:Subtopic {name: "Repair Costs"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "product quality"})
MERGE (s:Subtopic {name: "Vehicle Reliability"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "product quality"})
MERGE (e:Entity {name: "Arnold Clark"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "product quality"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "HS"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Curtis Haptonstal"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Competence"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Competence"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MA"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "CC"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Fraud Allegations"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment System Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Payment Processing"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Customer Trust"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "CO"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Redline Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Ombudsman"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Lack of Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Refund Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Redline Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Ombudsman"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Layna Lemay"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Settlement Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Insurance Payout"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Insurance Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Settlement Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Insurance Payout"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "BR"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "KW"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Queue Management"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Back Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Finance UK"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Queue Management"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Call Back Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Finance UK"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "EW"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Burton"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Finance Team"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Service Quality"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Burton"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Finance Team"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "zt w"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Inconsistent Information"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Inconsistent Information"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "CO"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MR"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Cancellation Policy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Extra Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Financial Ombudsman Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Cancellation Policy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Extra Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Financial Ombudsman Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "JA"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Wait Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "BMW"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Wait Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "BMW"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "AN"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Lease Terms"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Hidden Fees"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Fraud Allegations"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Lease Payment Transparency"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Hidden Fees"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Fraud Allegations"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MA"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Early Payment Terms"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Agreement Clarity"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Early Payment Terms"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Agreement Clarity"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "HG"})
MERGE (t:Topic {name: "billing issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "billing issues"})
MERGE (s:Subtopic {name: "Late Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "billing issues"})
MERGE (s:Subtopic {name: "Lack of Billing Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "billing issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "billing issues"})
MERGE (s:Subtopic {name: "Late Charges"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "billing issues"})
MERGE (s:Subtopic {name: "Lack of Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "EL"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Teresa Malagi"})
MERGE (t:Topic {name: "lien release process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "lien release process"})
MERGE (s:Subtopic {name: "Document Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "lien release process"})
MERGE (s:Subtopic {name: "Customer Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "lien release process"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "lien release process"})
MERGE (e:Entity {name: "Elk Grove Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "lien release process"})
MERGE (e:Entity {name: "GAP Insurance Department"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Lien Release Delay"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "GAP Insurance Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Customer Service"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Elk Grove Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "GAP Insurance Department"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "CH"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Competence"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Error Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Stress Level"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Denise"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Financial Ombudsman"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Competence"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Error Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Customer Stress"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Denise"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Financial Ombudsman"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "MA"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Issue Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "ELENA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Issue Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "ELENA"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Stephen Bellhouse"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Information Accuracy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Information Accuracy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Refund Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Finance"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "customer"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Recurring Payments"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Late Fees"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Credit Report Impact"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "2023 Corolla"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Recurring Payments"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Late Fees"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Credit Report Impact"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "2023 Corolla"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Daren Huntley"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Data Privacy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Unsolicited Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Data Privacy"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Company"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "NO"})
MERGE (t:Topic {name: "document handling"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "document handling"})
MERGE (s:Subtopic {name: "Shipping Method"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "document handling"})
MERGE (s:Subtopic {name: "Tracking Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "document handling"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "document handling"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "document handling"})
MERGE (e:Entity {name: "USPS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "document handling"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "document handling"})
MERGE (s:Subtopic {name: "Mailing Process"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "document handling"})
MERGE (s:Subtopic {name: "Tracking Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "document handling"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "document handling"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "document handling"})
MERGE (e:Entity {name: "USPS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "GR"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Steven"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Steven"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Red Green"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Service"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Service"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "LA"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Late Payment"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Financing Refusal"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Late Payment"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Financing Denial"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "馮博"})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (c:Customer {name: "Terry Hotchkiss"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Payment Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "SW"})
MERGE (t:Topic {name: "app performance"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "app performance"})
MERGE (s:Subtopic {name: "Access Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "app performance"})
MERGE (s:Subtopic {name: "Password Problems"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "app performance"})
MERGE (e:Entity {name: "Toyota App"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "app performance"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "app performance"})
MERGE (s:Subtopic {name: "Access Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "app performance"})
MERGE (s:Subtopic {name: "User Experience"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "app performance"})
MERGE (e:Entity {name: "Toyota App"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "AG"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Credit Profile Threat"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Incompetence"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "MK Dealer"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Credit Profile Threat"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Incompetence"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "MK Dealer"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "AH"})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Ombudsman Involvement"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Lack of Response"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Legal Action"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Ombudsman"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "refund process"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Ombudsman Involvement"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Lack of Response"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (s:Subtopic {name: "Legal Action"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "refund process"})
MERGE (e:Entity {name: "Ombudsman"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "IA"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Complaint Handling"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial Services"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "PC"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Process Complexity"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Accessibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Process Complexity"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "TFS"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "BR"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Issue Resolution"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "HPI"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Experian"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Resolution Speed"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "HPI"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Experian"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Tammy Alicia Lewis"})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "GAP Insurance"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Deferred Payments"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Financial Communication"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "2021 Toyota Supra"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "payment issues"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "GAP Insurance"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Deferred Payments"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (s:Subtopic {name: "Financial Transparency"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "payment issues"})
MERGE (e:Entity {name: "Toyota Supra"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "Mark Baird"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Process Complexity"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response Time"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Staff Attitude"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Communication Issues"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: "GL"})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Response to Financial Hardship"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Compassion"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Product Reliability"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Ford"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "NJ Commercial Mechanical Contractor"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (c:Customer {name: ""})
MERGE (t:Topic {name: "customer service"})
MERGE (c)-[:HAS_OPINION_ABOUT]->(t);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Lack of Support"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Payment Flexibility"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (s:Subtopic {name: "Customer Loyalty"})
MERGE (t)-[:HAS_SUBTOPIC]->(s);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Toyota Financial"})
MERGE (t)-[:RELATED_TO]->(e);
MERGE (t:Topic {name: "customer service"})
MERGE (e:Entity {name: "Ford"})
MERGE (t)-[:RELATED_TO]->(e);
