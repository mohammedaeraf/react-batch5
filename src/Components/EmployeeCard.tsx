import "./EmployeeCard.css";

type EmployeeProps = {
  name: string;
  position: string;
  department: string;
  salary: number;
};

function EmployeeCard({ name, position, department, salary }: EmployeeProps) {
  return (
    <div className="card">
      <div className="card-body shadow-sm border-0">
        <h3 className="card-title text-primary">{name}</h3>
        <h4 className="card-subtitle text-muted">{position}</h4>
        <p className="card-text">Department: {department}</p>
        <p className="card-text">Salary: ${salary}</p>
      </div>
    </div>
  );
}
export default EmployeeCard;
