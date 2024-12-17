# from fastapi import FastAPI, HTTPException, Depends
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy import create_engine, Column, String, Boolean, Date, Enum
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker, Session
# from pydantic import BaseModel
# from datetime import date
# from typing import Optional
# import enum
# from passlib.context import CryptContext
#
# # PostgreSQL Database setup
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root1234@localhost/employee_management"
# engine = create_engine(SQLALCHEMY_DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()
#
# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
#
#
# # Enums for departments and corresponding HODs and managers
# class DepartmentEnum(str, enum.Enum):
#     SMDDC = "SMDDC"
#     NMTC = "NMTC"
#     IT = "IT"
#     PD = "PD"
#     ADMIN = "ADMIN"
#
#
# # Department mappings
# DEPARTMENT_HOD_MAPPING = {
#     "SMDDC": "Richard",
#     "NMTC": "John",
#     "IT": "Henry",
#     "PD": "Kelvin",
#     "ADMIN": "Michel"
# }
#
# DEPARTMENT_MANAGER_MAPPING = {
#     "SMDDC": "ABC",
#     "NMTC": "DEF",
#     "IT": "GHI",
#     "PD": "JKL",
#     "ADMIN": "MNO"
# }
#
#
# # Database Model
# class Staff(Base):
#     __tablename__ = "staff"
#
#     username = Column(String, primary_key=True, index=True)
#     password = Column(String)
#     department = Column(String)
#     hod = Column(String)
#     manager = Column(String)
#     contact_number = Column(String)
#     date_of_joining = Column(Date)
#     staff_id = Column(String, unique=True)
#     qualification = Column(String)
#     is_admin = Column(Boolean, default=False)
#
#
# # Pydantic models
# class StaffCreate(BaseModel):
#     username: str
#     password: str
#     department: DepartmentEnum
#     contact_number: str
#     date_of_joining: date
#     staff_id: str
#     qualification: str
#     is_admin: Optional[bool] = False
#
#
# class StaffLogin(BaseModel):
#     username: str
#     password: str
#
#
# class StaffResponse(BaseModel):
#     username: str
#     department: str
#     hod: str
#     manager: str
#
#
# # Create tables
# Base.metadata.create_all(bind=engine)
#
# # FastAPI app
# app = FastAPI()
#
# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#
#
# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
#
#
# # Registration endpoint
# @app.post("/register")
# def register(staff: StaffCreate, db: Session = Depends(get_db)):
#     # Check if username already exists
#     if db.query(Staff).filter(Staff.username == staff.username).first():
#         raise HTTPException(status_code=400, detail="Username already registered")
#
#     # Check if staff_id already exists
#     if db.query(Staff).filter(Staff.staff_id == staff.staff_id).first():
#         raise HTTPException(status_code=400, detail="Staff ID already exists")
#
#     # Get HOD and Manager based on department
#     hod = DEPARTMENT_HOD_MAPPING[staff.department]
#     manager = DEPARTMENT_MANAGER_MAPPING[staff.department]
#
#     # Create new staff member
#     db_staff = Staff(
#         username=staff.username,
#         password=pwd_context.hash(staff.password),
#         department=staff.department,
#         hod=hod,
#         manager=manager,
#         contact_number=staff.contact_number,
#         date_of_joining=staff.date_of_joining,
#         staff_id=staff.staff_id,
#         qualification=staff.qualification,
#         is_admin=staff.is_admin
#     )
#
#     try:
#         db.add(db_staff)
#         db.commit()
#         db.refresh(db_staff)
#
#         # Return success message with staff details
#         return {
#             "message": "Staff registered successfully",
#             "staff_details": {
#                 "username": db_staff.username,
#                 "department": db_staff.department,
#                 "hod": db_staff.hod,
#                 "manager": db_staff.manager
#             }
#         }
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(status_code=500, detail=str(e))
#
#
# # Login endpoint
# @app.post("/login")
# def login(staff: StaffLogin, db: Session = Depends(get_db)):
#     db_staff = db.query(Staff).filter(Staff.username == staff.username).first()
#     if not db_staff:
#         raise HTTPException(status_code=400, detail="Invalid credentials")
#
#     if not pwd_context.verify(staff.password, db_staff.password):
#         raise HTTPException(status_code=400, detail="Invalid credentials")
#
#     # Return staff details along with login success message
#     return {
#         "message": "Admin has logged in successfully" if db_staff.is_admin else f"User {db_staff.username} has logged in successfully",
#         "staff_details": {
#             "username": db_staff.username,
#             "department": db_staff.department,
#             "hod": db_staff.hod,
#             "manager": db_staff.manager
#         }
#     }
#
#
# @app.get("/department-members")
# def get_department_members(department: str, db: Session = Depends(get_db)):
#     # Fetch all staff members in the specified department
#     department_staff = db.query(Staff).filter(Staff.department == department).all()
#
#     # Convert to list of dictionaries
#     staff_list = [{
#         "username": staff.username,
#         "staff_id": staff.staff_id,
#         "contact_number": staff.contact_number,
#         "date_of_joining": staff.date_of_joining.isoformat(),
#         "qualification": staff.qualification
#     } for staff in department_staff]
#
#     return {"members": staff_list}


from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String, Boolean, Date, Enum, Integer, ForeignKey, Table, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional, List
import enum
from passlib.context import CryptContext

# PostgreSQL Database setup
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root1234@localhost/employee_management"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Enums for departments and task status
class DepartmentEnum(str, enum.Enum):
    SMDDC = "SMDDC"
    NMTC = "NMTC"
    IT = "IT"
    PD = "PD"
    ADMIN = "ADMIN"


class TaskStatusEnum(str, enum.Enum):
    NOT_STARTED = "not_started"
    PROCESSING = "processing"
    COMPLETED = "completed"


# Department mappings
DEPARTMENT_HOD_MAPPING = {
    "SMDDC": "Richard",
    "NMTC": "John",
    "IT": "Henry",
    "PD": "Kelvin",
    "ADMIN": "Michel"
}

DEPARTMENT_MANAGER_MAPPING = {
    "SMDDC": "Janvi",
    "NMTC": "Roopa",
    "IT": "Pranitha",
    "PD": "Bhavya",
    "ADMIN": "Lohith"
}

# Association table for many-to-many relationship between Task and Staff
task_staff_association = Table(
    'task_staff_association', Base.metadata,
    Column('task_id', Integer, ForeignKey('tasks.id'), primary_key=True),
    Column('staff_username', String, ForeignKey('staff.username'), primary_key=True)
)


# Database Models
class Staff(Base):
    __tablename__ = "staff"

    username = Column(String, primary_key=True, index=True)
    password = Column(String)
    department = Column(String)
    hod = Column(String)
    manager = Column(String)
    contact_number = Column(String)
    date_of_joining = Column(Date)
    staff_id = Column(String, unique=True)
    qualification = Column(String)
    is_admin = Column(Boolean, default=False)

    # Relationship with tasks
    assigned_tasks = relationship(
        "Task",
        secondary=task_staff_association,
        back_populates="assigned_staff"
    )


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, nullable=False)
    description = Column(String)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    status = Column(Enum(TaskStatusEnum), default=TaskStatusEnum.NOT_STARTED)

    # Many-to-many relationship with Staff
    assigned_staff = relationship(
        "Staff",
        secondary=task_staff_association,
        back_populates="assigned_tasks"
    )


# Pydantic models
# class StaffCreate(BaseModel):
#     username: str
#     password: str
#     department: DepartmentEnum
#     contact_number: str
#     date_of_joining: date
#     staff_id: str
#     qualification: str
#     is_admin: Optional[bool] = False
class StaffCreate(BaseModel):
    username: str
    password: str
    department: Optional[DepartmentEnum] = None
    contact_number: str
    date_of_joining: date
    staff_id: Optional[str] = None
    qualification: str
    is_admin: Optional[bool] = False

class StaffLogin(BaseModel):
    username: str
    password: str


class StaffResponse(BaseModel):
    username: str
    department: str
    hod: str
    manager: str


class TaskCreate(BaseModel):
    project_name: str
    description: str
    start_time: datetime
    end_time: datetime
    status: TaskStatusEnum
    assigned_staff: List[str]  # List of usernames


class TaskResponse(BaseModel):
    id: int
    project_name: str
    description: str
    start_time: datetime
    end_time: datetime
    status: TaskStatusEnum
    assigned_staff: List[str]


# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Registration endpoint this is old one register code
# @app.post("/register")
# def register(staff: StaffCreate, db: Session = Depends(get_db)):
#     # Check if username already exists
#     if db.query(Staff).filter(Staff.username == staff.username).first():
#         raise HTTPException(status_code=400, detail="Username already registered")
#
#     # Check if staff_id already exists
#     if db.query(Staff).filter(Staff.staff_id == staff.staff_id).first():
#         raise HTTPException(status_code=400, detail="Staff ID already exists")
#
#     # Get HOD and Manager based on department
#     hod = DEPARTMENT_HOD_MAPPING[staff.department]
#     manager = DEPARTMENT_MANAGER_MAPPING[staff.department]
#
#     # Create new staff member
#     db_staff = Staff(
#         username=staff.username,
#         password=pwd_context.hash(staff.password),
#         department=staff.department,
#         hod=hod,
#         manager=manager,
#         contact_number=staff.contact_number,
#         date_of_joining=staff.date_of_joining,
#         staff_id=staff.staff_id,
#         qualification=staff.qualification,
#         is_admin=staff.is_admin
#     )
#
#     try:
#         db.add(db_staff)
#         db.commit()
#         db.refresh(db_staff)
#
#         # Return success message with staff details
#         return {
#             "message": "Staff registered successfully",
#             "staff_details": {
#                 "username": db_staff.username,
#                 "department": db_staff.department,
#                 "hod": db_staff.hod,
#                 "manager": db_staff.manager
#             }
#         }
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/register")
def register(staff: StaffCreate, db: Session = Depends(get_db)):
    # Check if username already exists
    if db.query(Staff).filter(Staff.username == staff.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")

    # For admin registration, skip department and staff_id checks
    if staff.is_admin:
        # Set default values for department and staff_id for admin
        hod = None
        manager = None
    else:
        # Check if staff_id already exists for non-admin users
        if db.query(Staff).filter(Staff.staff_id == staff.staff_id).first():
            raise HTTPException(status_code=400, detail="Staff ID already exists")

        # Get HOD and Manager based on department
        hod = DEPARTMENT_HOD_MAPPING.get(staff.department)
        manager = DEPARTMENT_MANAGER_MAPPING.get(staff.department)

        # Validate department for non-admin users
        if not hod or not manager:
            raise HTTPException(status_code=400, detail="Invalid department")

    # Create new staff member
    db_staff = Staff(
        username=staff.username,
        password=pwd_context.hash(staff.password),
        department=staff.department if not staff.is_admin else None,  # Set to None for admin
        hod=hod,
        manager=manager,
        contact_number=staff.contact_number,
        date_of_joining=staff.date_of_joining,
        staff_id=staff.staff_id if not staff.is_admin else None,  # Set to None for admin
        qualification=staff.qualification,
        is_admin=staff.is_admin
    )

    try:
        db.add(db_staff)
        db.commit()
        db.refresh(db_staff)

        # Return success message with staff details
        return {
            "message": "Admin registered successfully" if staff.is_admin else "Staff registered successfully",
            "staff_details": {
                "username": db_staff.username,
                "department": db_staff.department,
                "hod": db_staff.hod,
                "manager": db_staff.manager,
                "is_admin": db_staff.is_admin
            }
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
# Login endpoint
@app.post("/login")
def login(staff: StaffLogin, db: Session = Depends(get_db)):
    db_staff = db.query(Staff).filter(Staff.username == staff.username).first()
    if not db_staff:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not pwd_context.verify(staff.password, db_staff.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Return staff details along with login success message
    return {
        "message": "Admin has logged in successfully" if db_staff.is_admin else f"User {db_staff.username} has logged in successfully",
        "staff_details": {
            "username": db_staff.username,
            "department": db_staff.department,
            "hod": db_staff.hod,
            "manager": db_staff.manager
        }
    }


# Department members endpoint
@app.get("/department-members")
def get_department_members(department: str, db: Session = Depends(get_db)):
    # Fetch all staff members in the specified department
    department_staff = db.query(Staff).filter(Staff.department == department).all()


    # Determine HOD and Manager for the department
    hod = DEPARTMENT_HOD_MAPPING.get(department, 'Not Assigned')
    manager = DEPARTMENT_MANAGER_MAPPING.get(department, 'Not Assigned')

    # Convert to list of dictionaries
    staff_list = [{
        "username": staff.username,
        "staff_id": staff.staff_id,
        "contact_number": staff.contact_number,
        "date_of_joining": staff.date_of_joining.isoformat(),
        "qualification": staff.qualification
    } for staff in department_staff]


    return {
        "members": staff_list,
        "hod": hod,
        "manager": manager
    }



# Task Creation Endpoint
@app.post("/create-task", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    # Validate start and end times
    if task.start_time >= task.end_time:
        raise HTTPException(status_code=400, detail="Start time must be before end time")

    # Check if all assigned staff exist
    assigned_staff = []
    for username in task.assigned_staff:
        staff = db.query(Staff).filter(Staff.username == username).first()
        if not staff:
            raise HTTPException(status_code=400, detail=f"User {username} not found")
        assigned_staff.append(staff)

    # Create new task
    db_task = Task(
        project_name=task.project_name,
        description=task.description,
        start_time=task.start_time,
        end_time=task.end_time,
        status=task.status
    )

    # Assign staff to the task
    db_task.assigned_staff = assigned_staff

    try:
        db.add(db_task)
        db.commit()
        db.refresh(db_task)

        # Prepare response
        return TaskResponse(
            id=db_task.id,
            project_name=db_task.project_name,
            description=db_task.description,
            start_time=db_task.start_time,
            end_time=db_task.end_time,
            status=db_task.status,
            assigned_staff=[staff.username for staff in db_task.assigned_staff]
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# Endpoint to get tasks for a specific staff member
@app.get("/staff-tasks", response_model=List[TaskResponse])
def get_staff_tasks(username: str, db: Session = Depends(get_db)):
    # Verify staff exists
    staff = db.query(Staff).filter(Staff.username == username).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")

    # Retrieve tasks assigned to the staff member
    tasks = staff.assigned_tasks

    # Convert tasks to TaskResponse models
    task_responses = [
        TaskResponse(
            id=task.id,
            project_name=task.project_name,
            description=task.description,
            start_time=task.start_time,
            end_time=task.end_time,
            status=task.status,
            assigned_staff=[s.username for s in task.assigned_staff]
        ) for task in tasks
    ]

    return task_responses


# Endpoint to update task status
@app.patch("/update-task-status/{task_id}")
def update_task_status(
        task_id: int,
        status: TaskStatusEnum,
        db: Session = Depends(get_db)
):
    # Find the task
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update task status
    try:
        db_task.status = status
        db.commit()
        db.refresh(db_task)

        return {
            "message": "Task status updated successfully",
            "task": {
                "id": db_task.id,
                "project_name": db_task.project_name,
                "status": db_task.status
            }
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


#     below is endpoint extra added '''''''''''''

@app.get("/department-projects", response_model=List[TaskResponse])
def get_department_projects(department: str, db: Session = Depends(get_db)):
    # Verify the department is valid
    if department not in DepartmentEnum.__members__:
        raise HTTPException(status_code=400, detail="Invalid department")

    # Fetch tasks for the specified department
    # This will find tasks where at least one assigned staff member is from the given department
    tasks = db.query(Task).join(task_staff_association).join(Staff)\
        .filter(Staff.department == department)\
        .distinct().all()

    # Convert tasks to TaskResponse models
    task_responses = [
        TaskResponse(
            id=task.id,
            project_name=task.project_name,
            description=task.description,
            start_time=task.start_time,
            end_time=task.end_time,
            status=task.status,
            assigned_staff=[s.username for s in task.assigned_staff]
        ) for task in tasks
    ]

    return task_responses


# Run using this command-> uvicorn main:app --reload --port 8002